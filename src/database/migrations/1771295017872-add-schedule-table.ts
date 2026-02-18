import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScheduleTable1771295017872 implements MigrationInterface {
  name = 'AddScheduleTable1771295017872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."schedules_type_enum" AS ENUM('SCHEDULED', 'LESSON')`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedules" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."schedules_type_enum" NOT NULL DEFAULT 'SCHEDULED', "day_of_week" integer, "hour" TIME, "timezone" character varying(255), "scheduled_for" TIMESTAMP WITH TIME ZONE, "last_send" TIMESTAMP WITH TIME ZONE, "user_uuid" uuid, CONSTRAINT "PK_8c90a3b023778665e10b0838190" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "notification_token" character varying(255)`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_dae948a971c0364cb1630d09c57" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_dae948a971c0364cb1630d09c57"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "notification_token"`);
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TYPE "public"."schedules_type_enum"`);
  }
}
