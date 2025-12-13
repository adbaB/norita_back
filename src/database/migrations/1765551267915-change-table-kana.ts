import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableKana1765551267915 implements MigrationInterface {
  name = 'ChangeTableKana1765551267915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_kana" RENAME COLUMN "romanji" TO "romaji"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_kana" RENAME COLUMN "romaji" TO "romanji"');
  }
}
