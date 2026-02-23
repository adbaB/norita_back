import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiaryAikoSection1771601512980 implements MigrationInterface {
  name = 'DiaryAikoSection1771601512980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "diary_aiko_sections" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8abff9b469521e4ad36a78e7f3d" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "diary_aiko_sections"`);
  }
}
