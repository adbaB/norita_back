import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScheduleTable1771292260996 implements MigrationInterface {
  name = 'AddScheduleTable1771292260996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedules" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "day_of_week" character varying(255), "hour" TIME, "timezone" character varying(255), "lastSend" TIMESTAMP, "user_uuid" uuid, CONSTRAINT "PK_8c90a3b023778665e10b0838190" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "notification_token" character varying(255)`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_dae948a971c0364cb1630d09c57" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_dae948a971c0364cb1630d09c57"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "notification_token"`);
    await queryRunner.query(`DROP TABLE "schedules"`);
  }
}
