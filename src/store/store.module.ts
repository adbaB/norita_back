import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { Library } from '../library/entities/library.entity';
import { PackageController } from './controllers/package.controller';
import { Package } from './entities/package.entity';
import { PackageService } from './services/package.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Library]), ExchangeRateModule],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
