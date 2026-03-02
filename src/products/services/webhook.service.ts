import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entitlement } from '../entities/product.entity';
import { Transaction } from '../entities/transaction.entity';

import { TypeUnlockEnum } from '../../libraryUser/enums/typeUnlock.enum';
import { LibraryUserService } from '../../libraryUser/services/libraryUser.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(Entitlement)
    private readonly entitlementRepo: Repository<Entitlement>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly usersService: UsersService,
    private readonly libraryUserService: LibraryUserService,
  ) {}

  async processRevenueCatEvent(event: Record<string, unknown>): Promise<void> {
    if (!event) return;

    const eventType = event.type;
    const userId = event.app_user_id as string;
    const transactionId = event.transaction_id as string;
    const environment = event.environment as string;
    const entitlementIds: string[] = (event.entitlement_ids as string[]) || [];
    const expirationAtMs = event.expiration_at_ms ? Number(event.expiration_at_ms) : undefined;

    if (!userId) {
      this.logger.warn('Evento sin app_user_id. Ignorado.');
      return;
    }

    switch (eventType) {
      case 'TEST':
        this.logger.log('Webhook de prueba recibido exitosamente.');
        break;

      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'NON_RENEWING_PURCHASE':
        if (transactionId) {
          const alreadyProcessed = await this.transactionRepo.exists({
            where: { userUuid: userId, transactionId, eventType },
          });
          if (alreadyProcessed) {
            this.logger.warn(`Evento duplicado ignorado: ${eventType} (${transactionId})`);
            return;
          }
        }
        await this.logTransaction(userId, entitlementIds, transactionId, eventType, environment);
        for (const entitlementId of entitlementIds) {
          await this.handlePurchase(userId, entitlementId, eventType, expirationAtMs);
        }
        break;

      case 'EXPIRATION':
        for (const entitlementId of entitlementIds) {
          await this.handleExpiration(userId, entitlementId);
        }
        break;

      case 'CANCELLATION':
        this.logger.log(`Usuario ${userId} desactivó la auto-renovación. (Evento: ${eventType})`);
        break;

      case 'BILLING_ISSUE':
        this.logger.warn(`Problema de cobro con el usuario: ${userId}. Tarjeta rechazada.`);
        break;

      default:
        this.logger.debug(`Evento de RevenueCat ignorado o no manejado: ${eventType}`);
        break;
    }
  }

  private async logTransaction(
    userId: string,
    entitlementIds: string[],
    transactionId: string | undefined,
    eventType: string,
    environment: string | undefined,
  ): Promise<void> {
    try {
      const transaction = this.transactionRepo.create({
        userUuid: userId,
        entitlementIds,
        transactionId: transactionId || null,
        eventType,
        environment: environment || null,
      });
      await this.transactionRepo.save(transaction);
      this.logger.log(
        `Transacción registrada: ${eventType} para entitlements [${entitlementIds.join(', ')}]`,
      );
    } catch (error) {
      this.logger.error(
        `Error al registrar la transacción de entitlements para el usuario ${userId}`,
        error,
      );
      throw error;
    }
  }

  private async handlePurchase(
    userId: string,
    entitlementId: string,
    eventType: string,
    expirationAtMs?: number,
  ): Promise<void> {
    if (!entitlementId) return;

    const entitlement = await this.entitlementRepo.findOne({
      where: { entitlementId, isActive: true },
      relations: ['grantsLibrary'],
    });
    if (!entitlement) {
      this.logger.warn(
        `Producto no encontrado en la base de datos con entitlement: ${entitlementId}`,
      );
      return;
    }

    this.logger.log(
      `Procesando compra (${eventType}) para el usuario ${userId} y entitlement ${entitlementId}. Expiración (ms): ${expirationAtMs}`,
    );

    try {
      if (entitlement.coinsToGrant > 0) {
        await this.usersService.increaseCoins(userId, entitlement.coinsToGrant);
        this.logger.log(`Agregadas ${entitlement.coinsToGrant} monedas al usuario ${userId}.`);
      }

      if (entitlement.grantsPremium) {
        await this.usersService.grantPremium(userId, expirationAtMs);
        this.logger.log(`Otorgado Premium al usuario ${userId}.`);
      }

      if (entitlement.grantsRemoveAds) {
        await this.usersService.removeAds(userId, expirationAtMs);
        this.logger.log(`Removidos los anuncios al usuario ${userId}.`);
      }

      if (entitlement.grantsLibrary && entitlement.grantsLibrary.length > 0) {
        for (const lib of entitlement.grantsLibrary) {
          await this.libraryUserService.unlock(userId, lib.uuid, TypeUnlockEnum.PURCHASED);
          this.logger.log(`Biblioteca ${lib.uuid} desbloqueada para el usuario ${userId}.`);
        }
      }
    } catch (error) {
      this.logger.error(
        `Error al procesar la compra del entitlement ${entitlementId} para el usuario ${userId}`,
        error,
      );
      throw error;
    }
  }

  private async handleExpiration(userId: string, entitlementId: string): Promise<void> {
    if (!entitlementId) return;

    const entitlement = await this.entitlementRepo.findOne({ where: { entitlementId } });
    if (!entitlement) {
      return;
    }

    this.logger.log(
      `La suscripción expiró. Revocando beneficios del entitlement ${entitlementId} al usuario: ${userId}`,
    );

    try {
      if (entitlement.grantsPremium) {
        await this.usersService.revokePremium(userId);
        this.logger.log(`Premium revocado al usuario ${userId}.`);
      }

      if (entitlement.grantsRemoveAds) {
        await this.usersService.restoreAds(userId);
        this.logger.log(`Anuncios restaurados al usuario ${userId}.`);
      }
    } catch (error) {
      this.logger.error(
        `Error al revocar el entitlement ${entitlementId} para el usuario ${userId}`,
        error,
      );
      throw error;
    }
  }
}
