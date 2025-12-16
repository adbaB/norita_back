import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableOnomatopoeia1765899074303 implements MigrationInterface {
  name = 'ChangeTableOnomatopoeia1765899074303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" DROP CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8"',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "word" character varying(100) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD CONSTRAINT "UQ_dfd607678cdb50c1e6e9648f2af" UNIQUE ("word")',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "wordKatakana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "wordKatakana" character varying(100)',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "wordRomaji" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" DROP CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8"',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "wordRomaji" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "wordKatakana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "wordKatakana" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" DROP CONSTRAINT "UQ_dfd607678cdb50c1e6e9648f2af"',
    );
    await queryRunner.query('ALTER TABLE "library_item_onomatopoeia" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD "word" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
