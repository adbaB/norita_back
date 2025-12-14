import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLibraryItemVocabulary1765676870233 implements MigrationInterface {
  name = 'AddTableLibraryItemVocabulary1765676870233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "library_item_vocabulary" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio" jsonb NOT NULL DEFAULT '{"male":"","female":""}', "category" jsonb NOT NULL DEFAULT '[]', "example" jsonb NOT NULL DEFAULT '[]', "frequency" character varying(100), "jltp" character varying(100), "note" jsonb NOT NULL DEFAULT '[]', "structureWord" jsonb NOT NULL DEFAULT '{}', "traductionSpanish" jsonb NOT NULL DEFAULT '[]', "library_item_uuid" uuid, CONSTRAINT "REL_7f9acb45070054819be7b0b1e8" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_307caec12292ca32a0e53f3a37e" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."Library_type_enum" RENAME TO "Library_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."library_type_enum" AS ENUM('grammar', 'vocabulary', 'specialized')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "type" TYPE "public"."library_type_enum" USING "type"::"text"::"public"."library_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."Library_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ADD CONSTRAINT "FK_7f9acb45070054819be7b0b1e83" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" DROP CONSTRAINT "FK_7f9acb45070054819be7b0b1e83"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."Library_type_enum_old" AS ENUM('grammar', 'vocabulary', 'specialized')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "type" TYPE "public"."Library_type_enum_old" USING "type"::"text"::"public"."Library_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."library_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."Library_type_enum_old" RENAME TO "Library_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "library_item_vocabulary"`);
  }
}
