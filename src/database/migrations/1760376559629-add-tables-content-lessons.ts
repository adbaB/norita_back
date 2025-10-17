import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesContentLessons1760376559629 implements MigrationInterface {
  name = 'AddTablesContentLessons1760376559629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "bibliography" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "audio" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_content_uuid" uuid, CONSTRAINT "PK_c2e765978336ebade5ad2a7a724" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"dialog_story_structure_enum\" AS ENUM('1', '2', '3')",
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"dialog_type_structure_enum\" AS ENUM('1', '2', '3', '4', '5', '6')",
    );
    await queryRunner.query(
      'CREATE TABLE "dialog" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "lottie_animation" character varying(255), "story_structure" "public"."dialog_story_structure_enum" NOT NULL, "type_structure" "public"."dialog_type_structure_enum" NOT NULL, "focused" boolean NOT NULL DEFAULT false, "audio" character varying(255), "content" jsonb NOT NULL DEFAULT \'{}\', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_content_uuid" uuid, CONSTRAINT "PK_4b53861f5dad2bf0341dc68878a" PRIMARY KEY ("uuid")); COMMENT ON COLUMN "dialog"."story_structure" IS \'1: beginning, 2: middle, 3: end\'; COMMENT ON COLUMN "dialog"."type_structure" IS \'1: Paragraph, 2: Image , 3: Lottie , 4: Gif, 5: Next point, 6: Subtopic point\'',
    );
    await queryRunner.query(
      'CREATE TABLE "glossary" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "kanji" text NOT NULL, "kana" text NOT NULL, "romaji" text NOT NULL, "description" text NOT NULL, "audio" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_content_uuid" uuid, CONSTRAINT "PK_a24effc91919c28fef9f0cf0655" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "notes" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "audio" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_content_uuid" uuid, CONSTRAINT "PK_098232e9365ec2dac9ef2f550f7" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "content" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "lesson_uuid" uuid, CONSTRAINT "REL_c7287f4f12809b2c016412fd6a" UNIQUE ("lesson_uuid"), CONSTRAINT "PK_716e52e140822c18048be6f01c4" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "bibliography" ADD CONSTRAINT "FK_294934302520bb1b216a9dabc31" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" ADD CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "glossary" ADD CONSTRAINT "FK_90c7d0003f85148f02febc23bde" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "notes" ADD CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "content" ADD CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "content" DROP CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6"',
    );
    await queryRunner.query('ALTER TABLE "notes" DROP CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422"');
    await queryRunner.query(
      'ALTER TABLE "glossary" DROP CONSTRAINT "FK_90c7d0003f85148f02febc23bde"',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" DROP CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477"',
    );
    await queryRunner.query(
      'ALTER TABLE "bibliography" DROP CONSTRAINT "FK_294934302520bb1b216a9dabc31"',
    );
    await queryRunner.query('DROP TABLE "content"');
    await queryRunner.query('DROP TABLE "notes"');
    await queryRunner.query('DROP TABLE "glossary"');
    await queryRunner.query('DROP TABLE "dialog"');
    await queryRunner.query('DROP TYPE "public"."dialog_type_structure_enum"');
    await queryRunner.query('DROP TYPE "public"."dialog_story_structure_enum"');
    await queryRunner.query('DROP TABLE "bibliography"');
  }
}
