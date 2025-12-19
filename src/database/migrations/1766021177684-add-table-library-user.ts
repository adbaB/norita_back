import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLibraryUser1766021177684 implements MigrationInterface {
  name = 'AddTableLibraryUser1766021177684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."library_user_typeunlock_enum" AS ENUM('GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "library_user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "typeUnlock" "public"."library_user_typeunlock_enum" NOT NULL, "unlocked_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "library_uuid" uuid, "user_uuid" uuid, CONSTRAINT "UQ_19bc3eb8f47576d6a3dc87c78c8" UNIQUE ("library_uuid", "user_uuid"), CONSTRAINT "PK_67f38ae8e8a2924a3d073882ac8" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ADD CONSTRAINT "FK_cec1e028c876aacc7febbb616a2" FOREIGN KEY ("library_uuid") REFERENCES "library"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ADD CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_user" DROP CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" DROP CONSTRAINT "FK_cec1e028c876aacc7febbb616a2"`,
    );
    await queryRunner.query(`DROP TABLE "library_user"`);
    await queryRunner.query(`DROP TYPE "public"."library_user_typeunlock_enum"`);
  }
}
