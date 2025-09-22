import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableLevel1758123400094 implements MigrationInterface {
  name = 'AddTableLevel1758123400094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "level" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_72e4f6019c6ce1edafb744ea2f6" UNIQUE ("title"), CONSTRAINT "UQ_0430abefb8036d8c2f2b75d339b" UNIQUE ("order"), CONSTRAINT "PK_91cf31440fd8f96b37aef55288b" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query('ALTER TABLE "user" ADD "level_uuid" uuid');
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_a7272147e2fbc323e4c70e7e8d5" FOREIGN KEY ("level_uuid") REFERENCES "level"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_a7272147e2fbc323e4c70e7e8d5"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "level_uuid"');
    await queryRunner.query('DROP TABLE "level"');
  }
}
