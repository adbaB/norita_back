import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeCountsToLessons1788825234173 implements MigrationInterface {
  name = 'AddTypeCountsToLessons1788825234173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lessons" ADD "type_counts" jsonb DEFAULT '{}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "type_counts"`);
  }
}
