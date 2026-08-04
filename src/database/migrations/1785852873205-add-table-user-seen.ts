import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableUserSeen1785852873205 implements MigrationInterface {
  name = 'AddTableUserSeen1785852873205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_seen_activities_difficulty_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_seen_activities" (
        "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "activity_uuid" uuid NOT NULL,
        "lesson_uuid" uuid NOT NULL,
        "difficulty" "public"."user_seen_activities_difficulty_enum" NOT NULL DEFAULT '1',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_da423dd054aaf4b94da4d1fe026" PRIMARY KEY ("uuid")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ccdda9e9a79975ddb4cc1c929b" ON "user_seen_activities" ("user_id", "lesson_uuid", "difficulty")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" ADD CONSTRAINT "FK_e08a67cda11dd4afa1341435b09" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" ADD CONSTRAINT "FK_4e2b866645e3bde5bb8675869d6" FOREIGN KEY ("activity_uuid") REFERENCES "activities"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" ADD CONSTRAINT "FK_574e7bc8b5ca942eadbb5378133" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" DROP CONSTRAINT "FK_574e7bc8b5ca942eadbb5378133"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" DROP CONSTRAINT "FK_4e2b866645e3bde5bb8675869d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_seen_activities" DROP CONSTRAINT "FK_e08a67cda11dd4afa1341435b09"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_ccdda9e9a79975ddb4cc1c929b"`);
    await queryRunner.query(`DROP TABLE "user_seen_activities"`);
    await queryRunner.query(`DROP TYPE "public"."user_seen_activities_difficulty_enum"`);
  }
}
