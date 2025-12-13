import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePackage1765237553006 implements MigrationInterface {
  name = 'RemovePackage1765237553006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library_item_numbers" DROP COLUMN "package"');
    await queryRunner.query('ALTER TABLE "library_item_kanji" DROP COLUMN "package"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD "package" character varying(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ADD "package" character varying(255) NOT NULL',
    );
  }
}
