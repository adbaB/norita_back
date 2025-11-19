import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsUnlockedColumn1763559220708 implements MigrationInterface {
  name = 'AddIsUnlockedColumn1763559220708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "is_unlocked" boolean NOT NULL DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "is_unlocked"');
  }
}
