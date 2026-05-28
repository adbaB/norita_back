import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNewsStructureAndSeed1779999132589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Modificar el esquema para admitir IDs y fechas como VARCHAR
    await queryRunner.query(
      `ALTER TABLE "update_section" DROP CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_update_news" DROP CONSTRAINT "PK_2f5276a2574dc8f76f7c435ab42"`,
    );

    await queryRunner.query(
      `ALTER TABLE "app_update_news" ALTER COLUMN "id" TYPE character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ALTER COLUMN "news_id" TYPE character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ALTER COLUMN "publishedAt" TYPE character varying(100)`,
    );
    await queryRunner.query(`ALTER TABLE "update_section" ALTER COLUMN "title" DROP NOT NULL`);

    await queryRunner.query(
      `ALTER TABLE "app_update_news" ADD CONSTRAINT "PK_2f5276a2574dc8f76f7c435ab42" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ADD CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd" FOREIGN KEY ("news_id") REFERENCES "app_update_news"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "update_section" DROP CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_update_news" DROP CONSTRAINT "PK_2f5276a2574dc8f76f7c435ab42"`,
    );

    await queryRunner.query(
      `ALTER TABLE "app_update_news" ALTER COLUMN "id" TYPE uuid USING "id"::uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ALTER COLUMN "news_id" TYPE uuid USING "news_id"::uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ALTER COLUMN "publishedAt" TYPE timestamp with time zone USING "publishedAt"::timestamp with time zone`,
    );

    await queryRunner.query(`UPDATE "update_section" SET "title" = '' WHERE "title" IS NULL`);
    await queryRunner.query(`ALTER TABLE "update_section" ALTER COLUMN "title" SET NOT NULL`);

    await queryRunner.query(
      `ALTER TABLE "app_update_news" ADD CONSTRAINT "PK_2f5276a2574dc8f76f7c435ab42" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ADD CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd" FOREIGN KEY ("news_id") REFERENCES "app_update_news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
