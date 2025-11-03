import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentTable1762195746637 implements MigrationInterface {
  name = 'AddCommentTable1762195746637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user_likes" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "isLike" boolean NOT NULL DEFAULT true, "user_uuid" uuid, "comment_uuid" uuid, CONSTRAINT "UQ_3b07505793e95cbdb2837b18bbd" UNIQUE ("user_uuid", "comment_uuid"), CONSTRAINT "PK_0fcdd62a5402d763d51604de8f0" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_5b45cc3753f7972cae546076e8" ON "user_likes" ("comment_uuid") ',
    );
    await queryRunner.query(
      'CREATE TABLE "comment" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "rating" integer NOT NULL DEFAULT \'0\', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_uuid" uuid, "lesson_uuid" uuid, CONSTRAINT "PK_e45a9d11ff7a3cf11f6c42107b4" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "user_likes" ADD CONSTRAINT "FK_971b953f99d545162a481e43aa8" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_likes" ADD CONSTRAINT "FK_5b45cc3753f7972cae546076e82" FOREIGN KEY ("comment_uuid") REFERENCES "comment"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_76a1f3c548b4f327f5d46a721ab" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_76a1f3c548b4f327f5d46a721ab"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_likes" DROP CONSTRAINT "FK_5b45cc3753f7972cae546076e82"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_likes" DROP CONSTRAINT "FK_971b953f99d545162a481e43aa8"',
    );
    await queryRunner.query('DROP TABLE "comment"');
    await queryRunner.query('DROP INDEX "public"."IDX_5b45cc3753f7972cae546076e8"');
    await queryRunner.query('DROP TABLE "user_likes"');
  }
}
