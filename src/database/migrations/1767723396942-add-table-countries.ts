import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableCountries1767723396942 implements MigrationInterface {
  name = 'AddTableCountries1767723396942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "countries" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying(255) NOT NULL, "country_iso_code" character varying(255) NOT NULL, "currency_iso_code" character varying(255) NOT NULL, "currency_name" character varying(255) NOT NULL, "symbol" character varying(255) NOT NULL, "rate" numeric(10,4) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3115e13484de63ce2534c6f3559" UNIQUE ("country"), CONSTRAINT "UQ_510e5e01c637281fb5c3bac2d9d" UNIQUE ("country_iso_code"),CONSTRAINT "PK_58032a22048c4fef6cb819c1f62" PRIMARY KEY ("uuid"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "countries"');
  }
}
