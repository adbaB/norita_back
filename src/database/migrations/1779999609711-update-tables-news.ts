import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesNews1779999609711 implements MigrationInterface {
  name = 'UpdateTablesNews1779999609711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "update_section" DROP CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd"`,
    );
    await queryRunner.query(`ALTER TABLE "app_update_news" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "app_update_news" DROP COLUMN "publishedAt"`);
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ADD "publishedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ADD CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd" FOREIGN KEY ("news_id") REFERENCES "app_update_news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "update_section" DROP CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd"`,
    );
    await queryRunner.query(`ALTER TABLE "app_update_news" DROP COLUMN "publishedAt"`);
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ADD "publishedAt" character varying(100) NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_update_news" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ADD CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd" FOREIGN KEY ("news_id") REFERENCES "app_update_news"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
