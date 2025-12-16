import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableAdjectives1765896342819 implements MigrationInterface {
  name = 'ChangeTableAdjectives1765896342819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" DROP CONSTRAINT "FK_2319ff0c9566722d789b7a56f33"',
    );
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "adjective"');
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "baseHiragana" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "baseKanji" character varying(255)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "baseRomaji" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "word" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD CONSTRAINT "UQ_46e5e2e6861d967c24207c3a675" UNIQUE ("word")',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "wordHiragana" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD "wordRomaji" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD CONSTRAINT "FK_2319ff0c9566722d789b7a56f33" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" DROP CONSTRAINT "FK_2319ff0c9566722d789b7a56f33"',
    );
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "wordRomaji"');
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" DROP CONSTRAINT "UQ_46e5e2e6861d967c24207c3a675"',
    );
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "word"');
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "baseRomaji"');
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "baseKanji"');
    await queryRunner.query('ALTER TABLE "library_item_adjectives" DROP COLUMN "baseHiragana"');
    await queryRunner.query('ALTER TABLE "library_item_adjectives" ADD "adjective" jsonb');
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD CONSTRAINT "FK_2319ff0c9566722d789b7a56f33" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
