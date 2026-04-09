import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStrokeKanjiEntity1775743421169 implements MigrationInterface {
  name = 'AddStrokeKanjiEntity1775743421169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ADD "strokes" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "library_item_kanji" DROP COLUMN "strokes"`);
  }
}
