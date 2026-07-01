import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleActivityOption1782946007797 implements MigrationInterface {
  name = 'AddRoleActivityOption1782946007797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_options" ADD "role" character varying(20) NOT NULL DEFAULT 'option'`,
    );
    await queryRunner.query(`ALTER TABLE "activity_options" ADD "kanji" text`);
    await queryRunner.query(`ALTER TABLE "activity_options" ADD "correct_position" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "activity_options" DROP COLUMN "correct_position"`);
    await queryRunner.query(`ALTER TABLE "activity_options" DROP COLUMN "kanji"`);
    await queryRunner.query(`ALTER TABLE "activity_options" DROP COLUMN "role"`);
  }
}
