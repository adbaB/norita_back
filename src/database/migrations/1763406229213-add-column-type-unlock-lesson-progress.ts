import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTypeUnlockLessonProgress1763406229213 implements MigrationInterface {
  name = 'AddColumnTypeUnlockLessonProgress1763406229213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"lesson_progress_type_unlock_enum\" AS ENUM('BASIC', 'GEMS', 'PREMIUM')",
    );
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "type_unlock" "public"."lesson_progress_type_unlock_enum"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "type_unlock"');
    await queryRunner.query('DROP TYPE "public"."lesson_progress_type_unlock_enum"');
  }
}
