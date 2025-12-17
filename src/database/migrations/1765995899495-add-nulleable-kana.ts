import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNulleableKana1765995899495 implements MigrationInterface {
  name = 'AddNulleableKana1765995899495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "enabled" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "audio" DROP NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "audio" SET DEFAULT \'{"male":"","female":""}\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "consonant" DROP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "error" DROP NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "pronunciation" DROP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "images" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "images" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "pronunciation" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "error" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "consonant" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ALTER COLUMN "audio" SET DEFAULT \'{"male": "", "female": ""}\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "audio" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "enabled"');
  }
}
