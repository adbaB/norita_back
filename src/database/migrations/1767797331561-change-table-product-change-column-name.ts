import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableProductChangeColumnName1767797331561 implements MigrationInterface {
  name = 'ChangeTableProductChangeColumnName1767797331561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "currency_amount" TO "coins_included"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "coins_included" TO "currency_amount"`,
    );
  }
}
