import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLessonProgress1761675937853 implements MigrationInterface {
  name = 'AddTableLessonProgress1761675937853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "lesson_progress" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "unlocked_at" TIMESTAMP WITH TIME ZONE NOT NULL, "completed" boolean NOT NULL DEFAULT false, "lastLineSeen" integer NOT NULL DEFAULT \'0\', "date_completed" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "lesson_uuid" uuid, CONSTRAINT "PK_12f91027489693a645912bad01e" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_5aec9a234606ab3e611e0d36a6a" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_11d9f67f8491c3119c5cc4515de" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_11d9f67f8491c3119c5cc4515de"',
    );
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_5aec9a234606ab3e611e0d36a6a"',
    );
    await queryRunner.query('DROP TABLE "lesson_progress"');
  }
}
