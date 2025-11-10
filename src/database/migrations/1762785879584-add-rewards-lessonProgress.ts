import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRewardsLessonProgress1762785879584 implements MigrationInterface {
  name = 'AddRewardsLessonProgress1762785879584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "reward_claimed" boolean NOT NULL DEFAULT false',
    );
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "date_reward_claimed" TIMESTAMP WITH TIME ZONE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "date_reward_claimed"');
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "reward_claimed"');
  }
}
