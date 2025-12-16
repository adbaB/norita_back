import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableCounters1765897453183 implements MigrationInterface {
  name = 'ChangeTableCounters1765897453183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD CONSTRAINT "UQ_f4f94852915f55a8c480a96ae9e" UNIQUE ("word")',
    );
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "wordHiragana" character varying(255)',
    );
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "wordRomaji" character varying(255)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "wordRomaji" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "wordHiragana" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" DROP CONSTRAINT "UQ_f4f94852915f55a8c480a96ae9e"',
    );
  }
}
