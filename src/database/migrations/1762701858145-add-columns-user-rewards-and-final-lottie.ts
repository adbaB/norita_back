import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsUserRewardsAndFinalLottie1762701858145 implements MigrationInterface {
  name = 'AddColumnsUserRewardsAndFinalLottie1762701858145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "first_lesson" TO "first_rewards"');
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "second_lesson" TO "second_rewards"');
    await queryRunner.query(
      'ALTER TABLE "dialog" ADD "lottie_animation_final" character varying(255)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "first_rewards" TO "first_lesson"');
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "second_rewards" TO "second_lesson"');

    await queryRunner.query('ALTER TABLE "dialog" DROP COLUMN "lottie_animation_final"');
  }
}
