import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Countries } from '../entities/countries.entity';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Countries)
    private readonly exchangeRateRepository: Repository<Countries>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron(): Promise<void> {
    this.logger.debug('Fetching exchange rates...');
    const apiKey = this.configService.get<string>('config.exchangeRate.apiKey');

    if (!apiKey) {
      this.logger.error('Exchange Rate API Key is missing in configuration');
      return;
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
      const { data } = await firstValueFrom(this.httpService.get(url));

      if (data && data.result === 'success' && data.conversion_rates) {
        await this.saveRates(data.conversion_rates);
        this.logger.debug('Exchange rates updated successfully.');
      } else {
        this.logger.error('Failed to fetch rates or invalid response structure.');
      }
    } catch (error) {
      this.logger.error('Error fetching exchange rates', error);
    }
  }

  private async saveRates(rates: Record<string, number>): Promise<void> {
    for (const [isoCode, rate] of Object.entries(rates)) {
      // Check if entity exists
      console.log(isoCode, rate);
      const entities = await this.exchangeRateRepository.find({
        where: { currencyIsoCode: isoCode.toLowerCase() },
      });

      if (entities.length > 0) {
        for (const item of entities) {
          item.rate = rate;
        }
        console.log(entities);
        await this.exchangeRateRepository.save(entities);
        continue;
      }

      await this.exchangeRateRepository.save(entities);
    }
  }

  public async getExchangeRate(countryCode: string): Promise<Countries> {
    if (!countryCode) {
      return null;
    }
    const entity = await this.exchangeRateRepository.findOne({
      where: { countryIsoCode: countryCode?.toUpperCase() },
    });
    return entity;
  }
}
