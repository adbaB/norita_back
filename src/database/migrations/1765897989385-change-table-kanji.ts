import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableKanji1765897989385 implements MigrationInterface {
  name = 'ChangeTableKanji1765897989385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" DROP CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f"',
    );
    await queryRunner.query('ALTER TABLE "library_item_kanji" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD "word" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD CONSTRAINT "UQ_d5bd6b9ee7903c32f9b1ebbcac3" UNIQUE ("word")',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" DROP CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" DROP CONSTRAINT "UQ_d5bd6b9ee7903c32f9b1ebbcac3"',
    );
    await queryRunner.query('ALTER TABLE "library_item_kanji" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD "word" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
