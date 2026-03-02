import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesToProducts1772206379636 implements MigrationInterface {
  name = 'AddTablesToProducts1772206379636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_uuid" uuid NOT NULL, "entitlement_ids" text NOT NULL, "transaction_id" character varying(255), "event_type" character varying(255) NOT NULL, "environment" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fcce0ce5cc7762e90d2cc7e2307" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."product_type_enum" AS ENUM('COIN', 'PREMIUM', 'REMOVE_ADS', 'UNLOCK_LIBRARY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "entitlement_id" character varying(255) NOT NULL, "type" "public"."product_type_enum" NOT NULL, "grants_premiun" boolean NOT NULL DEFAULT false, "grants_remove_ads" boolean NOT NULL DEFAULT false, "coins_to_grant" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_21d3619fdda5ceb7984ba450153" UNIQUE ("entitlement_id"), CONSTRAINT "PK_1442fd7cb5e0b32ff5d0b6c13d0" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_library" ("product_uuid" uuid NOT NULL, "library_uuid" uuid NOT NULL, CONSTRAINT "PK_0b4d32cde71508e2cce43017292" PRIMARY KEY ("product_uuid", "library_uuid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b63906b4781b6e170408b1fa4" ON "product_library" ("product_uuid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_034194c93375692ae056385e8b" ON "product_library" ("library_uuid") `,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."library_user_typeunlock_enum" RENAME TO "library_user_typeunlock_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."library_user_typeunlock_enum" AS ENUM('GEMS', 'PREMIUM', 'PURCHASED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ALTER COLUMN "typeUnlock" TYPE "public"."library_user_typeunlock_enum" USING "typeUnlock"::"text"::"public"."library_user_typeunlock_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."library_user_typeunlock_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."library_section_user_typeunlock_enum" RENAME TO "library_section_user_typeunlock_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."library_section_user_typeunlock_enum" AS ENUM('GEMS', 'PREMIUM', 'PURCHASED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ALTER COLUMN "typeUnlock" TYPE "public"."library_section_user_typeunlock_enum" USING "typeUnlock"::"text"::"public"."library_section_user_typeunlock_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."library_section_user_typeunlock_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "user_diary_aiko_items" ADD CONSTRAINT "UQ_59bc8b2d96c486c07c27e661b88" UNIQUE ("user_uuid", "item_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_library" ADD CONSTRAINT "FK_6b63906b4781b6e170408b1fa40" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_library" ADD CONSTRAINT "FK_034194c93375692ae056385e8bc" FOREIGN KEY ("library_uuid") REFERENCES "library"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_library" DROP CONSTRAINT "FK_034194c93375692ae056385e8bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_library" DROP CONSTRAINT "FK_6b63906b4781b6e170408b1fa40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_diary_aiko_items" DROP CONSTRAINT "UQ_59bc8b2d96c486c07c27e661b88"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."library_section_user_typeunlock_enum_old" AS ENUM('GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ALTER COLUMN "typeUnlock" TYPE "public"."library_section_user_typeunlock_enum_old" USING "typeUnlock"::"text"::"public"."library_section_user_typeunlock_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."library_section_user_typeunlock_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."library_section_user_typeunlock_enum_old" RENAME TO "library_section_user_typeunlock_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."library_user_typeunlock_enum_old" AS ENUM('GEMS', 'PREMIUM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ALTER COLUMN "typeUnlock" TYPE "public"."library_user_typeunlock_enum_old" USING "typeUnlock"::"text"::"public"."library_user_typeunlock_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."library_user_typeunlock_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."library_user_typeunlock_enum_old" RENAME TO "library_user_typeunlock_enum"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_034194c93375692ae056385e8b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6b63906b4781b6e170408b1fa4"`);
    await queryRunner.query(`DROP TABLE "product_library"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
