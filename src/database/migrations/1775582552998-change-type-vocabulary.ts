import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypeVocabulary1775582552998 implements MigrationInterface {
  name = 'ChangeTypeVocabulary1775582552998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "example" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "note" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_vocabulary" DROP COLUMN "searchKanji"`);
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ADD "searchKanji" jsonb DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "library_item_vocabulary" DROP COLUMN "searchKanji"`);
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ADD "searchKanji" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "note" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "example" SET NOT NULL`,
    );
  }
}
