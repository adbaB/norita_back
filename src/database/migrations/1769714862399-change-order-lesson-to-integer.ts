import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOrderLessonToInteger1769714862399 implements MigrationInterface {
  name = 'ChangeOrderLessonToInteger1769714862399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" ALTER COLUMN "order" TYPE integer USING ROUND("order")::integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons"  ALTER COLUMN "order" TYPE numeric(10,2) USING order::numeric`,
    );
  }
}
