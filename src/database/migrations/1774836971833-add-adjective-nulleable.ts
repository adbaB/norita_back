import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdjectiveNulleable1774836971833 implements MigrationInterface {
  name = 'AddAdjectiveNulleable1774836971833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "example" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "note" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "note" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "example" SET NOT NULL`,
    );
  }
}
