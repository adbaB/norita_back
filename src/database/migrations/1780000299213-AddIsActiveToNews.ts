import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToNews1780000299213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ADD "isActive" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_update_news" DROP COLUMN "isActive"`);
  }
}
