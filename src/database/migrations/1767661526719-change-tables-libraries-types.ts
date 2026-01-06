import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTablesLibrariesTypes1767661526719 implements MigrationInterface {
  name = 'ChangeTablesLibrariesTypes1767661526719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET DEFAULT \'{"male":"","female":""}\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "kunyomi" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "onyomi" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "stepImage" DROP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item_numbers" ALTER COLUMN "word" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ALTER COLUMN "variants" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ALTER COLUMN "variants" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item_numbers" ALTER COLUMN "word" DROP NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "stepImage" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "onyomi" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "kunyomi" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET DEFAULT \'{"male": "", "female": ""}\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET NOT NULL');
  }
}
