import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderInDialog1762890857600 implements MigrationInterface {
  name = 'AddOrderInDialog1762890857600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "dialog" ADD "order" integer');
    await queryRunner.query(
      'ALTER TABLE "dialog" ADD CONSTRAINT "UQ_cd2362ed6abb594f2d759c09598" UNIQUE ("lesson_content_uuid", "order")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "dialog" DROP CONSTRAINT "UQ_cd2362ed6abb594f2d759c09598"',
    );
    await queryRunner.query('ALTER TABLE "dialog" DROP COLUMN "order"');
  }
}
