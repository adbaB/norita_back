import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableProduct1767661222258 implements MigrationInterface {
  name = 'AddTableProduct1767661222258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "products" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL DEFAULT \'0\', "discount" numeric(10,2) NOT NULL DEFAULT \'0\', "currency_amount" integer NOT NULL DEFAULT \'0\', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "product_libraries" ("product_id" uuid NOT NULL, "library_id" uuid NOT NULL, CONSTRAINT "PK_bcd3f85e2db328dd44970532d86" PRIMARY KEY ("product_id", "library_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_21ff1da74f4f2cee26c0b48a8f" ON "product_libraries" ("product_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_a073b9373bf96034af16388b57" ON "product_libraries" ("library_id") ',
    );
    await queryRunner.query(
      'ALTER TABLE "product_libraries" ADD CONSTRAINT "FK_21ff1da74f4f2cee26c0b48a8fa" FOREIGN KEY ("product_id") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "product_libraries" ADD CONSTRAINT "FK_a073b9373bf96034af16388b576" FOREIGN KEY ("library_id") REFERENCES "library"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "product_libraries" DROP CONSTRAINT "FK_a073b9373bf96034af16388b576"',
    );
    await queryRunner.query(
      'ALTER TABLE "product_libraries" DROP CONSTRAINT "FK_21ff1da74f4f2cee26c0b48a8fa"',
    );
    await queryRunner.query('DROP INDEX "public"."IDX_a073b9373bf96034af16388b57"');
    await queryRunner.query('DROP INDEX "public"."IDX_21ff1da74f4f2cee26c0b48a8f"');
    await queryRunner.query('DROP TABLE "product_libraries"');
    await queryRunner.query('DROP TABLE "products"');
  }
}
