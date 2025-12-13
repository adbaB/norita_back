import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameLibraryToLibrary1765653687523 implements MigrationInterface {
  name = 'ChangeNameLibraryToLibrary1765653687523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_section" DROP CONSTRAINT "FK_170dbe89c2036734898848ac96b"',
    );
    await queryRunner.query('ALTER TABLE "Library" RENAME TO "library"');
    await queryRunner.query(
      'ALTER TABLE "library_section" ADD CONSTRAINT "FK_170dbe89c2036734898848ac96b" FOREIGN KEY ("library_uuid") REFERENCES "library"("uuid")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_section" DROP CONSTRAINT "FK_170dbe89c2036734898848ac96b"',
    );
    await queryRunner.query('ALTER TABLE "library" RENAME TO "Library"');
    await queryRunner.query(
      'ALTER TABLE "library_section" ADD CONSTRAINT "FK_170dbe89c2036734898848ac96b" FOREIGN KEY ("library_uuid") REFERENCES "Library"("uuid")',
    );
  }
}
