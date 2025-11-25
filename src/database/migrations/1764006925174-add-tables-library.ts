import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesLibrary1764006925174 implements MigrationInterface {
  name = 'AddTablesLibrary1764006925174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"Library_type_enum\" AS ENUM('grammar', 'vocabulary', 'specialized')",
    );
    await queryRunner.query(
      'CREATE TABLE "Library" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "icon" character varying(255), "coins_needed" integer NOT NULL DEFAULT \'0\', "title_romaji" character varying(255) NOT NULL, "title_kanji" character varying(255) NOT NULL, "description" text, "warning" character varying(255), "order" integer NOT NULL, "type" "public"."Library_type_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_56f31f96fe5ad4672591b988fc4" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query('CREATE INDEX "idx_library_type" ON "Library" ("type") ');
    await queryRunner.query(
      'CREATE TABLE "library_item" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio" jsonb NOT NULL DEFAULT \'{"male":"","female":""}\', "error" jsonb NOT NULL DEFAULT \'[]\', "lottie" character varying(255), "package" character varying(255), "pronunciation" jsonb NOT NULL DEFAULT \'[]\', "romanji" jsonb NOT NULL DEFAULT \'{"hepburn":"","kunreishiki":"","nihonshiki":""}\', "images" jsonb NOT NULL DEFAULT \'[]\', "final_image" character varying(255), "word" character varying(255), "wordType" jsonb NOT NULL DEFAULT \'[]\', "order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "library_section_uuid" uuid, CONSTRAINT "PK_03d9402d1912ee69d07c12040f7" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "library_section" ("uuid" uuid NOT NULL, "title_romaji" character varying(255) NOT NULL, "title_kanji" character varying(255) NOT NULL, "coins_needed" integer NOT NULL DEFAULT \'0\', "order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "library_uuid" uuid, CONSTRAINT "PK_41d71588c5136ccc1ea40597219" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9" FOREIGN KEY ("library_section_uuid") REFERENCES "library_section"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "library_section" ADD CONSTRAINT "FK_170dbe89c2036734898848ac96b" FOREIGN KEY ("library_uuid") REFERENCES "Library"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_section" DROP CONSTRAINT "FK_170dbe89c2036734898848ac96b"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" DROP CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9"',
    );
    await queryRunner.query('DROP TABLE "library_section"');
    await queryRunner.query('DROP TABLE "library_item"');
    await queryRunner.query('DROP INDEX "public"."idx_library_type"');
    await queryRunner.query('DROP TABLE "Library"');
    await queryRunner.query('DROP TYPE "public"."Library_type_enum"');
  }
}
