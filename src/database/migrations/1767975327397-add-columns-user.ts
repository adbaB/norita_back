import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsUser1767975327397 implements MigrationInterface {
  name = 'AddColumnsUser1767975327397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user_images" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5339517e05ae1e49e6c89b23556" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query('ALTER TABLE "user" ADD "subscription_expires_at" TIMESTAMP');
    await queryRunner.query('ALTER TABLE "user" ADD "show_ads" boolean NOT NULL DEFAULT true');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "ads_free_expiration" TIMESTAMP WITH TIME ZONE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "ads_free_expiration"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "show_ads"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "subscription_expires_at"');
    await queryRunner.query('DROP TABLE "user_images"');
  }
}
