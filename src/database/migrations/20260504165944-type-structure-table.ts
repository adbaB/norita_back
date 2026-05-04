import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations20260504165944 implements MigrationInterface {
  name = 'Migrations20260504165944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Crear la tabla type_structure
    await queryRunner.query(`
      CREATE TABLE "type_structure" (
        "id" SERIAL NOT NULL,
        "name" character varying(100) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_type_structure_name" UNIQUE ("name"),
        CONSTRAINT "PK_type_structure" PRIMARY KEY ("id")
      )
    `);

    // 2. Insertar los valores originales del enum (manteniendo los mismos IDs)
    await queryRunner.query(`
      INSERT INTO "type_structure" ("id", "name") VALUES
        (1, 'Paragraph'),
        (2, 'Image'),
        (3, 'Lottie'),
        (4, 'Gif'),
        (5, 'Next Point'),
        (6, 'Subtopic Point')
    `);

    // Sincronizar la secuencia después de insertar IDs manuales
    await queryRunner.query(`SELECT setval('type_structure_id_seq', 6, true)`);

    // 3. Agregar la nueva columna FK (nullable primero para migrar datos)
    await queryRunner.query(`
      ALTER TABLE "dialog"
      ADD COLUMN "type_structure_id" integer
    `);

    // 4. Migrar datos existentes (enum → text → integer, no se puede castear directo)
    await queryRunner.query(`
      UPDATE "dialog"
      SET "type_structure_id" = CAST("type_structure"::text AS integer)
      WHERE "type_structure" IS NOT NULL
    `);

    // 5. Hacer la columna NOT NULL
    await queryRunner.query(`
      ALTER TABLE "dialog"
      ALTER COLUMN "type_structure_id" SET NOT NULL
    `);

    // 6. Agregar FK constraint
    await queryRunner.query(`
      ALTER TABLE "dialog"
      ADD CONSTRAINT "FK_dialog_type_structure"
      FOREIGN KEY ("type_structure_id") REFERENCES "type_structure"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);

    // 7. Eliminar la columna enum antigua
    await queryRunner.query(`ALTER TABLE "dialog" DROP COLUMN "type_structure"`);

    // 8. Eliminar el tipo enum de PostgreSQL
    await queryRunner.query(`DROP TYPE IF EXISTS "dialog_type_structure_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Recrear el tipo enum
    await queryRunner.query(`
      CREATE TYPE "dialog_type_structure_enum" AS ENUM('1', '2', '3', '4', '5', '6')
    `);

    // 2. Restaurar la columna enum
    await queryRunner.query(`
      ALTER TABLE "dialog"
      ADD COLUMN "type_structure" "dialog_type_structure_enum"
    `);

    // 3. Restaurar datos
    await queryRunner.query(`
      UPDATE "dialog"
      SET "type_structure" = CAST("type_structure_id" AS text)::"dialog_type_structure_enum"
      WHERE "type_structure_id" IS NOT NULL
    `);

    // 4. Eliminar FK y columna nueva
    await queryRunner.query(`
      ALTER TABLE "dialog"
      DROP CONSTRAINT "FK_dialog_type_structure"
    `);

    await queryRunner.query(`ALTER TABLE "dialog" DROP COLUMN "type_structure_id"`);

    // 5. Eliminar tabla type_structure
    await queryRunner.query(`DROP TABLE "type_structure"`);
  }
}
