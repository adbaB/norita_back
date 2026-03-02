import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameProductToEntitlement1772459230640 implements MigrationInterface {
  name = 'RenameProductToEntitlement1772459230640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop old Foreign Keys
    await queryRunner.query(
      `ALTER TABLE "product_library" DROP CONSTRAINT "FK_034194c93375692ae056385e8bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_library" DROP CONSTRAINT "FK_6b63906b4781b6e170408b1fa40"`,
    );

    // Rename table and pivot
    await queryRunner.query(`ALTER TABLE "product" RENAME TO "entitlement"`);
    await queryRunner.query(`ALTER TABLE "product_library" RENAME TO "entitlement_library"`);
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" RENAME COLUMN "product_uuid" TO "entitlement_uuid"`,
    );

    // Rename indices
    await queryRunner.query(
      `ALTER INDEX "IDX_6b63906b4781b6e170408b1fa4" RENAME TO "IDX_2b756b1dd503522f644e394426"`,
    );
    await queryRunner.query(
      `ALTER INDEX "IDX_034194c93375692ae056385e8b" RENAME TO "IDX_e49960b2ce96aebc00f4cde711"`,
    );

    // Drop old constraints
    await queryRunner.query(
      `ALTER TABLE "entitlement" DROP CONSTRAINT "UQ_21d3619fdda5ceb7984ba450153"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement" DROP CONSTRAINT "PK_1442fd7cb5e0b32ff5d0b6c13d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" DROP CONSTRAINT "PK_0b4d32cde71508e2cce43017292"`,
    );

    // Rename ENUM
    await queryRunner.query(
      `ALTER TYPE "public"."product_type_enum" RENAME TO "entitlement_type_enum"`,
    );

    // Add correct new constraints
    await queryRunner.query(`ALTER TABLE "entitlement" ADD "days" integer DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE "entitlement" ADD CONSTRAINT "UQ_20e8dddb0f54ba002ba97f085ef" UNIQUE ("entitlement_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement" ADD CONSTRAINT "PK_1285d451b6753b02929df719ddf" PRIMARY KEY ("uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" ADD CONSTRAINT "PK_3091b2c7dba62f2c8ad66a44e65" PRIMARY KEY ("entitlement_uuid", "library_uuid")`,
    );

    // Recreate foreign keys
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" ADD CONSTRAINT "FK_2b756b1dd503522f644e394426c" FOREIGN KEY ("entitlement_uuid") REFERENCES "entitlement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" ADD CONSTRAINT "FK_e49960b2ce96aebc00f4cde7114" FOREIGN KEY ("library_uuid") REFERENCES "library"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Current FKs
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" DROP CONSTRAINT "FK_e49960b2ce96aebc00f4cde7114"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" DROP CONSTRAINT "FK_2b756b1dd503522f644e394426c"`,
    );

    // Drop Current Constraints
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" DROP CONSTRAINT "PK_3091b2c7dba62f2c8ad66a44e65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement" DROP CONSTRAINT "PK_1285d451b6753b02929df719ddf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entitlement" DROP CONSTRAINT "UQ_20e8dddb0f54ba002ba97f085ef"`,
    );
    await queryRunner.query(`ALTER TABLE "entitlement" DROP COLUMN "days"`);

    // Rename ENUM
    await queryRunner.query(
      `ALTER TYPE "public"."entitlement_type_enum" RENAME TO "product_type_enum"`,
    );

    // Rename indices
    await queryRunner.query(
      `ALTER INDEX "IDX_e49960b2ce96aebc00f4cde711" RENAME TO "IDX_034194c93375692ae056385e8b"`,
    );
    await queryRunner.query(
      `ALTER INDEX "IDX_2b756b1dd503522f644e394426" RENAME TO "IDX_6b63906b4781b6e170408b1fa4"`,
    );

    // Rename Columns and Tables
    await queryRunner.query(
      `ALTER TABLE "entitlement_library" RENAME COLUMN "entitlement_uuid" TO "product_uuid"`,
    );
    await queryRunner.query(`ALTER TABLE "entitlement_library" RENAME TO "product_library"`);
    await queryRunner.query(`ALTER TABLE "entitlement" RENAME TO "product"`);

    // Restore old constraints
    await queryRunner.query(
      `ALTER TABLE "product_library" ADD CONSTRAINT "PK_0b4d32cde71508e2cce43017292" PRIMARY KEY ("product_uuid", "library_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_1442fd7cb5e0b32ff5d0b6c13d0" PRIMARY KEY ("uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_21d3619fdda5ceb7984ba450153" UNIQUE ("entitlement_id")`,
    );

    // Restore old Foreign keys
    await queryRunner.query(
      `ALTER TABLE "product_library" ADD CONSTRAINT "FK_034194c93375692ae056385e8bc" FOREIGN KEY ("library_uuid") REFERENCES "library"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_library" ADD CONSTRAINT "FK_6b63906b4781b6e170408b1fa40" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
