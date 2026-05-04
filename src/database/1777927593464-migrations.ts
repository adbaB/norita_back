import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1777927593464 implements MigrationInterface {
  name = 'Migrations1777927593464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "goals" ADD "icon" character varying(255)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "goals" DROP COLUMN "icon"');
  }
}
