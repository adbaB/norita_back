import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFowardSkipsCount1777388042724 implements MigrationInterface {
  name = 'AddFowardSkipsCount1777388042724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson_progress" ADD "forward_skips_count" integer NOT NULL DEFAULT \'0\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "lesson_progress" DROP COLUMN "forward_skips_count"');
  }
}
