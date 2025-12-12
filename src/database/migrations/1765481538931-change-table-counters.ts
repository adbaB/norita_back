import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableCounters1765481538931 implements MigrationInterface {
  name = 'ChangeTableCounters1765481538931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "hiraganaNumber"');
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "kanjiNumber"');
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "romajiNumber"');
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "romanNumber"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "numbers" jsonb NOT NULL DEFAULT \'[]\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_counters" DROP COLUMN "numbers"');
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "romanNumber" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "romajiNumber" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "kanjiNumber" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD "hiraganaNumber" jsonb NOT NULL DEFAULT \'[]\'',
    );
  }
}
