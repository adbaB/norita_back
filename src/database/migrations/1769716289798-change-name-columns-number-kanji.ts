import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameColumnsNumberKanji1769716289798 implements MigrationInterface {
  name = 'ChangeNameColumnsNumberKanji1769716289798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_kanji" RENAME COLUMN "traductionsSpanish" TO "traductionSpanish"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_numbers" RENAME COLUMN "traductionsSpanish" TO "traductionSpanish"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_numbers" RENAME COLUMN "traductionSpanish" TO "traductionsSpanish"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_kanji" RENAME COLUMN "traductionSpanish" TO "traductionsSpanish"`,
    );
  }
}
