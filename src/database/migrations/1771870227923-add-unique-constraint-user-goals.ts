import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintUserGoals1771870227923 implements MigrationInterface {
  name = 'AddUniqueConstraintUserGoals1771870227923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_goals" DROP CONSTRAINT "FK_5d3e56151ce68bb0ca26db1414f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" DROP CONSTRAINT "FK_02b902748c096060add855f95fe"`,
    );
    await queryRunner.query(`ALTER TABLE "user_goals" ALTER COLUMN "user_uuid" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_goals" ALTER COLUMN "goal_uuid" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_goals" ADD CONSTRAINT "UQ_e687c201e70429c563c892750ca" UNIQUE ("user_uuid", "goal_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" ADD CONSTRAINT "FK_5d3e56151ce68bb0ca26db1414f" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" ADD CONSTRAINT "FK_02b902748c096060add855f95fe" FOREIGN KEY ("goal_uuid") REFERENCES "goals"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_goals" DROP CONSTRAINT "FK_02b902748c096060add855f95fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" DROP CONSTRAINT "FK_5d3e56151ce68bb0ca26db1414f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" DROP CONSTRAINT "UQ_e687c201e70429c563c892750ca"`,
    );
    await queryRunner.query(`ALTER TABLE "user_goals" ALTER COLUMN "goal_uuid" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_goals" ALTER COLUMN "user_uuid" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_goals" ADD CONSTRAINT "FK_02b902748c096060add855f95fe" FOREIGN KEY ("goal_uuid") REFERENCES "goals"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_goals" ADD CONSTRAINT "FK_5d3e56151ce68bb0ca26db1414f" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
