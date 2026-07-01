import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActivity1782306603231 implements MigrationInterface {
  name = 'AddActivity1782306603231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "activity_options" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "text" text, "kana" text, "romaji" text, "image" character varying(255), "audio" character varying(255), "is_correct" boolean NOT NULL DEFAULT false, "group_key" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "activity_uuid" uuid NOT NULL, CONSTRAINT "PK_e1b775156373aa499773c63a3fc" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"activities_type_enum\" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')",
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"activities_difficulty_enum\" AS ENUM('1', '2', '3')",
    );
    await queryRunner.query(
      'CREATE TABLE "activities" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."activities_type_enum" NOT NULL, "difficulty" "public"."activities_difficulty_enum" NOT NULL DEFAULT \'1\', "order" integer NOT NULL, "instruction" text NOT NULL, "audio_instruction" character varying(255), "config" jsonb NOT NULL DEFAULT \'{}\', "feedback_correct" text, "feedback_incorrect" text, "audio_correct" character varying(255), "audio_incorrect" character varying(255), "points" integer NOT NULL DEFAULT \'10\', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_content_uuid" uuid NOT NULL, CONSTRAINT "UQ_7f24da0d4c15858ded8b772db7b" UNIQUE ("lesson_content_uuid", "order"), CONSTRAINT "PK_1c92642081b03303d870a272d77" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "activity_options" ADD CONSTRAINT "FK_7cb8619e66e2d477f2c14e399f4" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "activities" ADD CONSTRAINT "FK_2c7a28332c0b7a162f627f16496" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "activities" DROP CONSTRAINT "FK_2c7a28332c0b7a162f627f16496"',
    );
    await queryRunner.query(
      'ALTER TABLE "activity_options" DROP CONSTRAINT "FK_7cb8619e66e2d477f2c14e399f4"',
    );
    await queryRunner.query('DROP TABLE "activities"');
    await queryRunner.query('DROP TYPE "public"."activities_difficulty_enum"');
    await queryRunner.query('DROP TYPE "public"."activities_type_enum"');
    await queryRunner.query('DROP TABLE "activity_options"');
  }
}
