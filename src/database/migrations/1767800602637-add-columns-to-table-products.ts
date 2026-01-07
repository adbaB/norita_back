import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsToTableProducts1767800602637 implements MigrationInterface {
  name = 'AddColumnsToTableProducts1767800602637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "public"."products_type_enum" AS ENUM(\'COINS\', \'LIBRARY\')',
    );
    await queryRunner.query(
      'ALTER TABLE "products" ADD "type" "public"."products_type_enum" NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "products" ADD "enabled" boolean NOT NULL DEFAULT true');
    await queryRunner.query('ALTER TABLE "products" ADD "image" character varying(255)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "image"');
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "enabled"');
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."products_type_enum"');
  }
}
