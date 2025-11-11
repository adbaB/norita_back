import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConstraintNotNullLesson1762786465204 implements MigrationInterface {
  name = 'AddConstraintNotNullLesson1762786465204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ALTER COLUMN "lesson_uuid" SET NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ALTER COLUMN "lesson_uuid" DROP NOT NULL',
    );
  }
}
