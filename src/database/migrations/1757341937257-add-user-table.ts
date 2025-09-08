import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1757341937257 implements MigrationInterface {
  name = 'AddUserTable1757341937257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."user_role_enum" AS ENUM(\'user\', \'admin\')');
    await queryRunner.query(
      'CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "image" character varying(255), "sign_in_google" boolean NOT NULL DEFAULT false, "coin" integer NOT NULL DEFAULT \'0\', "is_premiun" boolean NOT NULL DEFAULT false, "first_tutorial" boolean NOT NULL DEFAULT false, "second_tutorial" boolean NOT NULL DEFAULT false, "first_lesson" boolean NOT NULL DEFAULT false, "second_lesson" boolean NOT NULL DEFAULT false, "device_jwt" character varying(255) NOT NULL DEFAULT \'\', "role" "public"."user_role_enum" NOT NULL DEFAULT \'user\', "is_active" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TYPE "public"."user_role_enum"');
  }
}
