import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHasSeenAlertShipToLessonProgress1768822000000 implements MigrationInterface {
  name = 'AddHasSeenAlertShipToLessonProgress1768822000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "has_seen_alert_ship" boolean NOT NULL DEFAULT false',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "has_seen_alert_ship"');
  }
}
