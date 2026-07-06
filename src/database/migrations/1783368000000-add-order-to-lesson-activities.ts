import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToLessonActivities1783368000000 implements MigrationInterface {
  name = 'AddOrderToLessonActivities1783368000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_activities" ADD "order" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson_activities" DROP COLUMN "order"`);
  }
}
