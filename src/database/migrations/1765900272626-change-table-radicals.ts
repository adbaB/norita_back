import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableRadicals1765900272626 implements MigrationInterface {
  name = 'ChangeTableRadicals1765900272626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" DROP CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0"',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "word" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD CONSTRAINT "UQ_3e239f82705579967ecf424d948" UNIQUE ("word")',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "wordHiragana" character varying(255)',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "wordRomaji" character varying(255)',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" DROP CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0"',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "wordRomaji"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "wordRomaji" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "wordHiragana"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "wordHiragana" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" DROP CONSTRAINT "UQ_3e239f82705579967ecf424d948"',
    );
    await queryRunner.query('ALTER TABLE "library_item_radicals" DROP COLUMN "word"');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD "word" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
