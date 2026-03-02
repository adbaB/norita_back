import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameDaysToMonths1772460901609 implements MigrationInterface {
  name = 'RenameDaysToMonths1772460901609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entitlement" RENAME COLUMN "days" TO "months"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entitlement" RENAME COLUMN "months" TO "days"`);
  }
}
