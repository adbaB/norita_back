import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonSessionsAndElo1783367173913 implements MigrationInterface {
  name = 'LessonSessionsAndElo1783367173913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_session_difficulty_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_session_status_enum" AS ENUM('COMPLETED', 'ABANDONED', 'REPEATED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_session" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "difficulty" "public"."lesson_session_difficulty_enum" NOT NULL, "status" "public"."lesson_session_status_enum" NOT NULL DEFAULT 'ABANDONED', "total_questions" integer NOT NULL, "correct_answers" integer NOT NULL DEFAULT '0', "incorrect_answers" integer NOT NULL DEFAULT '0', "percentage" double precision NOT NULL DEFAULT '0', "total_time_ms" integer, "started_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "completed_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, "lesson_id" uuid, CONSTRAINT "PK_fff631fc3c42623622c8e6acf5a" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."session_exercise_difficulty_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "session_exercise" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "difficulty" "public"."session_exercise_difficulty_enum" NOT NULL, "correct" boolean, "response_time_ms" integer, "answered_at" TIMESTAMP WITH TIME ZONE, "session_id" uuid, "exercise_id" uuid, CONSTRAINT "PK_3a83000bb90c1df733278e6d761" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_lesson_stat" ("user_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "last_played_at" TIMESTAMP WITH TIME ZONE, "times_played" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e8d2afeb0c7b6143a73ed4851b6" PRIMARY KEY ("user_id", "lesson_id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user_progress" ADD "lesson_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_progress" DROP CONSTRAINT "PK_c41601eeb8415a9eb15c8a4e557"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" ADD CONSTRAINT "PK_de6c7692d227177d4979fa43d49" PRIMARY KEY ("user_id", "lesson_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" ADD CONSTRAINT "FK_043658a2afb0ca5bd8375d49cb9" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_session" ADD CONSTRAINT "FK_fb11ec14668583031ba36c0a7dc" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_session" ADD CONSTRAINT "FK_af6aa40e2811ed8aff0fada1145" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_exercise" ADD CONSTRAINT "FK_b3622df522c83e41ddab76246e3" FOREIGN KEY ("session_id") REFERENCES "lesson_session"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_exercise" ADD CONSTRAINT "FK_94f5fe9ba5bf8e35513a1e3bdf1" FOREIGN KEY ("exercise_id") REFERENCES "activities"("uuid") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_lesson_stat" ADD CONSTRAINT "FK_b389ee172ddbec01ad53d725801" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_lesson_stat" ADD CONSTRAINT "FK_50924c37c404dd6cd894a5ae1c2" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_lesson_stat" DROP CONSTRAINT "FK_50924c37c404dd6cd894a5ae1c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_lesson_stat" DROP CONSTRAINT "FK_b389ee172ddbec01ad53d725801"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_exercise" DROP CONSTRAINT "FK_94f5fe9ba5bf8e35513a1e3bdf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_exercise" DROP CONSTRAINT "FK_b3622df522c83e41ddab76246e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_session" DROP CONSTRAINT "FK_af6aa40e2811ed8aff0fada1145"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_session" DROP CONSTRAINT "FK_fb11ec14668583031ba36c0a7dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" DROP CONSTRAINT "FK_043658a2afb0ca5bd8375d49cb9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" DROP CONSTRAINT "PK_de6c7692d227177d4979fa43d49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" ADD CONSTRAINT "PK_c41601eeb8415a9eb15c8a4e557" PRIMARY KEY ("user_id")`,
    );
    await queryRunner.query(`ALTER TABLE "user_progress" DROP COLUMN "lesson_id"`);
    await queryRunner.query(`DROP TABLE "user_lesson_stat"`);
    await queryRunner.query(`DROP TABLE "session_exercise"`);
    await queryRunner.query(`DROP TYPE "public"."session_exercise_difficulty_enum"`);
    await queryRunner.query(`DROP TABLE "lesson_session"`);
    await queryRunner.query(`DROP TYPE "public"."lesson_session_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."lesson_session_difficulty_enum"`);
  }
}
