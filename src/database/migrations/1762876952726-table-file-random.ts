import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableFileRandom1762876952726 implements MigrationInterface {
  name = 'TableFileRandom1762876952726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"file_random_type_enum\" AS ENUM('AUDIO_POPUPS', 'AUDIO_REWARDS_CLAIMED', 'AUDIO_REWARDS_DISQUALIFIED', 'AUDIO_REWARDS')",
    );
    await queryRunner.query(
      'CREATE TABLE "file_random" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file" character varying(255) NOT NULL, "type" "public"."file_random_type_enum" NOT NULL, CONSTRAINT "PK_25c8fb4fca3eb4cdfbfaf309e6d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_be9b44c4981b4c6fae55718b56" ON "file_random" ("type") ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_be9b44c4981b4c6fae55718b56"');
    await queryRunner.query('DROP TABLE "file_random"');
    await queryRunner.query('DROP TYPE "public"."file_random_type_enum"');
  }
}
