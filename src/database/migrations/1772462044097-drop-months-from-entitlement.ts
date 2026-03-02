import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropMonthsFromEntitlement1772462044097 implements MigrationInterface {
  name = 'DropMonthsFromEntitlement1772462044097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entitlement" DROP COLUMN "months"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entitlement" ADD "months" integer DEFAULT '0'`);
  }
}
