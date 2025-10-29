import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLessonsSections1758635431310 implements MigrationInterface {
  name = 'AddTableLessonsSections1758635431310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "sections" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6ed4a24a8cfe8931564c08e0588" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query("CREATE TYPE \"public\".\"lessons_type_enum\" AS ENUM('1', '2', '3')");
    await queryRunner.query(
      'CREATE TABLE "lessons" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."lessons_type_enum" NOT NULL, "reward" integer NOT NULL DEFAULT \'0\', "icon" character varying(255) NOT NULL, "background" character varying(255) NOT NULL, "number" character varying(10) NOT NULL, "name" character varying(255) NOT NULL, "content" text NOT NULL, "description" text, "time" integer, "coins_needed_unlock_with_requirements" integer NOT NULL DEFAULT \'0\', "coins_needed_unlock_without_requirements" integer NOT NULL DEFAULT \'0\', "time_to_unlock" integer NOT NULL DEFAULT \'0\' ,"created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "section_uuid" uuid NOT NULL, CONSTRAINT "PK_67edbf998244ca30b18a280c9a9" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "lessons" ADD CONSTRAINT "FK_6830fc4d2c748d65aa5f6b68d83" FOREIGN KEY ("section_uuid") REFERENCES "sections"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "lessons" ADD "order" numeric(10,2) NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "lessons" ADD CONSTRAINT "UQ_da90a6dd15565f99d93e3e903cb" UNIQUE ("number")',
    );
    await queryRunner.query(
      'ALTER TABLE "lessons" ADD CONSTRAINT "UQ_c4f65b4b4adaed916b2eec69bdd" UNIQUE ("name")',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_633a748d9720d4c3c25f0fc120" ON "lessons" ("order") ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_633a748d9720d4c3c25f0fc120"');
    await queryRunner.query(
      'ALTER TABLE "lessons" DROP CONSTRAINT "UQ_c4f65b4b4adaed916b2eec69bdd"',
    );
    await queryRunner.query(
      'ALTER TABLE "lessons" DROP CONSTRAINT "UQ_da90a6dd15565f99d93e3e903cb"',
    );
    await queryRunner.query('ALTER TABLE "lessons" DROP COLUMN "order"');
    await queryRunner.query(
      'ALTER TABLE "lessons" DROP CONSTRAINT "FK_6830fc4d2c748d65aa5f6b68d83"',
    );
    await queryRunner.query('DROP TABLE "lessons"');
    await queryRunner.query('DROP TYPE "public"."lessons_type_enum"');
    await queryRunner.query('DROP TABLE "sections"');
  }
}
