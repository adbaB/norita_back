import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueNameSections1763557697875 implements MigrationInterface {
  name = 'AddUniqueNameSections1763557697875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sections" ADD CONSTRAINT "UQ_b43359623c10ff3d0a199289b8d" UNIQUE ("name")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sections" DROP CONSTRAINT "UQ_b43359623c10ff3d0a199289b8d"',
    );
  }
}
