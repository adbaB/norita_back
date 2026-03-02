import { Module } from '@nestjs/common';
import { EntitlementsController } from './controllers/products.controller';
import { WebhookController } from './controllers/webhook.controller';
import { AuthorizationGuard } from './guards/authorization.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { LibraryUserModule } from '../libraryUser/libraryUser.module';
import { Entitlement } from './entities/product.entity';
import { Transaction } from './entities/transaction.entity';
import { Library } from '../library/entities/library.entity';
import { WebhookService } from './services/webhook.service';
import { EntitlementsService } from './services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entitlement, Transaction, Library]),
    UsersModule,
    LibraryUserModule,
  ],
  controllers: [EntitlementsController, WebhookController],
  providers: [AuthorizationGuard, WebhookService, EntitlementsService],
  exports: [WebhookService, EntitlementsService],
})
export class EntitlementsModule {}
