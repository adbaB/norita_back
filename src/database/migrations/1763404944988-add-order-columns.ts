import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderColumns1763404944988 implements MigrationInterface {
  name = 'AddOrderColumns1763404944988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bibliography" ADD "order" integer');
    await queryRunner.query('ALTER TABLE "glossary" ADD "order" integer');
    await queryRunner.query('ALTER TABLE "notes" ADD "order" integer');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "notes" DROP COLUMN "order"');
    await queryRunner.query('ALTER TABLE "glossary" DROP COLUMN "order"');
    await queryRunner.query('ALTER TABLE "bibliography" DROP COLUMN "order"');
  }
}
