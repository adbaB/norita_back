import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsUser1762439052230 implements MigrationInterface {
  name = 'AddColumnsUser1762439052230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "is_guest" boolean NOT NULL DEFAULT false');
    await queryRunner.query('ALTER TABLE "user" ADD "username" character varying(255)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "username"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "is_guest"');
  }
}
