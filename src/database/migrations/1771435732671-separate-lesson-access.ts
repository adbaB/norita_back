import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeparateLessonAccess1771435732671 implements MigrationInterface {
  name = 'SeparateLessonAccess1771435732671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_access_type_unlock_enum" AS ENUM('BASIC', 'GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_access" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "unlocked_at" TIMESTAMP WITH TIME ZONE NOT NULL, "type_unlock" "public"."lesson_access_type_unlock_enum", "is_unlocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "lesson_uuid" uuid NOT NULL, CONSTRAINT "PK_803a17eccbb2aecb9469d45c0db" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(`ALTER TABLE "lesson_progress" DROP COLUMN "unlocked_at"`);
    await queryRunner.query(`ALTER TABLE "lesson_progress" DROP COLUMN "type_unlock"`);
    await queryRunner.query(`DROP TYPE "public"."lesson_progress_type_unlock_enum"`);
    await queryRunner.query(`ALTER TABLE "lesson_progress" DROP COLUMN "is_unlocked"`);
    await queryRunner.query(
      `ALTER TABLE "lesson_access" ADD CONSTRAINT "FK_e160c50883eeaef7f289425637e" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_access" ADD CONSTRAINT "FK_e121648c47bb48593a75819d88f" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_access" DROP CONSTRAINT "FK_e121648c47bb48593a75819d88f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_access" DROP CONSTRAINT "FK_e160c50883eeaef7f289425637e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_progress" ADD "is_unlocked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_progress_type_unlock_enum" AS ENUM('BASIC', 'GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_progress" ADD "type_unlock" "public"."lesson_progress_type_unlock_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_progress" ADD "unlocked_at" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "lesson_access"`);
    await queryRunner.query(`DROP TYPE "public"."lesson_access_type_unlock_enum"`);
  }
}
