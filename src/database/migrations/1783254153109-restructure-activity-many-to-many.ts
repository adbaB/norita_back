import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestructureActivityManyToMany1783254153109 implements MigrationInterface {
  name = 'RestructureActivityManyToMany1783254153109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activities" DROP CONSTRAINT "FK_2c7a28332c0b7a162f627f16496"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" DROP CONSTRAINT "UQ_7f24da0d4c15858ded8b772db7b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_progress" ("user_id" uuid NOT NULL, "elo_score" double precision NOT NULL DEFAULT '300', "total_attempts" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c41601eeb8415a9eb15c8a4e557" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise_stat" ("user_id" uuid NOT NULL, "exercise_id" uuid NOT NULL, "times_played" integer NOT NULL DEFAULT '0', "total_learning" double precision NOT NULL DEFAULT '0', "last_played" TIMESTAMP WITH TIME ZONE, "average_response_time_ms" double precision, CONSTRAINT "PK_7e07bc72761509b65f4fbc72042" PRIMARY KEY ("user_id", "exercise_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_activities" ("activity_uuid" uuid NOT NULL, "lesson_uuid" uuid NOT NULL, CONSTRAINT "PK_d0327b5ac2e5b6db76775f12cb7" PRIMARY KEY ("activity_uuid", "lesson_uuid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b979891e11bf519ff1d648d1bc" ON "lesson_activities" ("activity_uuid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5caeab99403bbce264c6f4948a" ON "lesson_activities" ("lesson_uuid") `,
    );

    // ── DATA MIGRATION: preservar asociaciones Activity → Lesson existentes ──
    // Antes de eliminar lesson_content_uuid, copiamos las relaciones a la tabla pivote
    await queryRunner.query(`
            INSERT INTO "lesson_activities" ("activity_uuid", "lesson_uuid")
            SELECT a."uuid", c."lesson_uuid"
            FROM "activities" a
            INNER JOIN "content" c ON a."lesson_content_uuid" = c."uuid"
            WHERE a."deleted_at" IS NULL
            ON CONFLICT DO NOTHING
        `);

    await queryRunner.query(`ALTER TABLE "activities" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "activities" DROP COLUMN "lesson_content_uuid"`);
    await queryRunner.query(`ALTER TABLE "activity_options" DROP COLUMN "role"`);
    await queryRunner.query(
      `CREATE TYPE "public"."activity_options_role_enum" AS ENUM('chip', 'drop_zone', 'option')`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_options" ADD "role" "public"."activity_options_role_enum" NOT NULL DEFAULT 'option'`,
    );
    await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "config" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "user_progress" ADD CONSTRAINT "FK_c41601eeb8415a9eb15c8a4e557" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_stat" ADD CONSTRAINT "FK_b75f4f711d9e2762a1e6db69a68" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_stat" ADD CONSTRAINT "FK_f5d8fc34f257e90eca9a17fbdfc" FOREIGN KEY ("exercise_id") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_activities" ADD CONSTRAINT "FK_b979891e11bf519ff1d648d1bc8" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_activities" ADD CONSTRAINT "FK_5caeab99403bbce264c6f4948aa" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_activities" DROP CONSTRAINT "FK_5caeab99403bbce264c6f4948aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_activities" DROP CONSTRAINT "FK_b979891e11bf519ff1d648d1bc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_stat" DROP CONSTRAINT "FK_f5d8fc34f257e90eca9a17fbdfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_stat" DROP CONSTRAINT "FK_b75f4f711d9e2762a1e6db69a68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" DROP CONSTRAINT "FK_c41601eeb8415a9eb15c8a4e557"`,
    );
    await queryRunner.query(`ALTER TABLE "activities" ALTER COLUMN "config" SET DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "activity_options" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."activity_options_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "activity_options" ADD "role" character varying(20) NOT NULL DEFAULT 'option'`,
    );
    await queryRunner.query(`ALTER TABLE "activities" ADD "lesson_content_uuid" uuid`);
    await queryRunner.query(`ALTER TABLE "activities" ADD "order" integer`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5caeab99403bbce264c6f4948a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b979891e11bf519ff1d648d1bc"`);
    await queryRunner.query(`DROP TABLE "lesson_activities"`);
    await queryRunner.query(`DROP TABLE "exercise_stat"`);
    await queryRunner.query(`DROP TABLE "user_progress"`);
    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "UQ_7f24da0d4c15858ded8b772db7b" UNIQUE ("order", "lesson_content_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "FK_2c7a28332c0b7a162f627f16496" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
