import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintUserDiaryAiko1771859385270 implements MigrationInterface {
  name = 'AddUniqueConstraintUserDiaryAiko1771859385270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_diary_aiko_items" ADD CONSTRAINT "UQ_59bc8b2d96c486c07c27e661b88" UNIQUE ("user_uuid", "item_uuid")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_diary_aiko_items" DROP CONSTRAINT "UQ_59bc8b2d96c486c07c27e661b88"`,
    );
  }
}
