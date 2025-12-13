import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameLibraryToLibrary1765653687523 implements MigrationInterface {
  name = 'ChangeNameLibraryToLibrary1765653687523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Library" RENAME TO "library"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "library" RENAME TO "Library"');
  }
}
