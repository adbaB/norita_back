import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLibrarySectionUser1766025890467 implements MigrationInterface {
  name = 'AddTableLibrarySectionUser1766025890467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."library_section_user_typeunlock_enum" AS ENUM('GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "library_section_user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "typeUnlock" "public"."library_section_user_typeunlock_enum" NOT NULL, "unlocked_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "library_section_uuid" uuid, "user_uuid" uuid, CONSTRAINT "UQ_0a2ab90a6b6eb3ff9395a879da1" UNIQUE ("library_section_uuid", "user_uuid"), CONSTRAINT "PK_bb1c303e0a8b5f9067481b4f1e5" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ADD CONSTRAINT "FK_0c101000910f0f919cf883b26af" FOREIGN KEY ("library_section_uuid") REFERENCES "library_section"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ADD CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_section_user" DROP CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" DROP CONSTRAINT "FK_0c101000910f0f919cf883b26af"`,
    );
    await queryRunner.query(`DROP TABLE "library_section_user"`);
    await queryRunner.query(`DROP TYPE "public"."library_section_user_typeunlock_enum"`);
  }
}
