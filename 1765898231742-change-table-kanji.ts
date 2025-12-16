import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableKanji1765898231742 implements MigrationInterface {
  name = 'ChangeTableKanji1765898231742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_numbers" DROP COLUMN "translation"');
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ADD "traductionsSpanish" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ADD CONSTRAINT "UQ_e49aa5a138b8cf90f9d3aef7373" UNIQUE ("word")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" DROP CONSTRAINT "UQ_e49aa5a138b8cf90f9d3aef7373"',
    );
    await queryRunner.query('ALTER TABLE "library_item_numbers" DROP COLUMN "traductionsSpanish"');
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ADD "translation" character varying(255)',
    );
  }
}
