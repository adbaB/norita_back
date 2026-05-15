import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsPublicProperty1778780887714 implements MigrationInterface {
  name = 'AddIsPublicProperty1778780887714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "library" ADD "isPublic" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "library_section" ADD "isPublic" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "library_section" DROP COLUMN "isPublic"`);
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "isPublic"`);
  }
}
