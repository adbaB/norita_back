import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from './entities/countries.entity';
import { ExchangeRateService } from './services/exchange-rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Countries]), HttpModule, ConfigModule],
  providers: [ExchangeRateService],

  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
