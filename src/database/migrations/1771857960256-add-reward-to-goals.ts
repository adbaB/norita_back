import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRewardToGoals1771857960256 implements MigrationInterface {
  name = 'AddRewardToGoals1771857960256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "goals" ADD "reward" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "goals" DROP COLUMN "reward"`);
  }
}
