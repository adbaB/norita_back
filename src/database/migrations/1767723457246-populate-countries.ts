import { MigrationInterface, QueryRunner } from 'typeorm';
import { Countries } from '../../exchange-rate/entities/countries.entity';
import { countries } from '../seeds/countries';

export class PopulateCountries1767723457246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const country of countries) {
      const entity = new Countries();
      entity.country = country.name;
      entity.countryIsoCode = country.iso_code;
      entity.currencyIsoCode = country.currency;
      entity.currencyName = new Intl.DisplayNames(['es'], { type: 'currency' }).of(
        country.currency,
      );
      entity.rate = 0;
      entity.symbol = country.symbol;
      await queryRunner.manager.save(entity);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
