import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableVocabulary1765902497199 implements MigrationInterface {
  name = 'ChangeTableVocabulary1765902497199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" DROP CONSTRAINT "FK_7f9acb45070054819be7b0b1e83"',
    );
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "structureWord"');
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "loanHiragana" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "loanRomaji" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "searchKanji" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "word" character varying(100) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD CONSTRAINT "UQ_b4ecfbc1aa81a49cf8be879ef89" UNIQUE ("word")',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "wordHiragana" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "wordRomaji" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD CONSTRAINT "FK_7f9acb45070054819be7b0b1e83" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" DROP CONSTRAINT "FK_7f9acb45070054819be7b0b1e83"',
    );
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "wordRomaji"');
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" DROP CONSTRAINT "UQ_b4ecfbc1aa81a49cf8be879ef89"',
    );
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "word"');
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "searchKanji"');
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "loanRomaji"');
    await queryRunner.query('ALTER TABLE "library_item_vocabulary" DROP COLUMN "loanHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD "structureWord" jsonb NOT NULL DEFAULT \'{}\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_vocabulary" ADD CONSTRAINT "FK_7f9acb45070054819be7b0b1e83" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
