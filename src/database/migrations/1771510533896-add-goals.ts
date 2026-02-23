import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGoals1771510533896 implements MigrationInterface {
  name = 'AddGoals1771510533896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "goals" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "section_uuid" uuid, CONSTRAINT "PK_0b9e985bca446e851a802432bef" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_goals" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_claimed" boolean NOT NULL DEFAULT false, "claimed_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "goal_uuid" uuid, CONSTRAINT "PK_2f7a8d33ec269ae0b60744fdc07" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_4d0cfbd96dd2e30049b750168a0" FOREIGN KEY ("section_uuid") REFERENCES "sections"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_4d0cfbd96dd2e30049b750168a0"`);
    await queryRunner.query(`DROP TABLE "user_goals"`);
    await queryRunner.query(`DROP TABLE "goals"`);
  }
}
