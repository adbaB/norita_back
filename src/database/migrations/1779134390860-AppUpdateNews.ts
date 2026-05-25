import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppUpdateNews1779134390860 implements MigrationInterface {
  name = 'AppUpdateNews1779134390860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_update_news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "versionName" character varying(50) NOT NULL, "publishedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "friendlyTitle" character varying(255) NOT NULL, "introMessage" text NOT NULL, "closingMessage" text, CONSTRAINT "PK_2f5276a2574dc8f76f7c435ab42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "update_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "estimatedRelease" character varying(100), "section_id" uuid, CONSTRAINT "PK_aed056d1e79c21f6185a4bc0bcc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "update_section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "type" integer NOT NULL, "news_id" uuid, CONSTRAINT "PK_0c6c092a1aa9859155bf3e84c88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_item" ADD CONSTRAINT "FK_69bb786d38c871aa3756c588f07" FOREIGN KEY ("section_id") REFERENCES "update_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_section" ADD CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd" FOREIGN KEY ("news_id") REFERENCES "app_update_news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "update_section" DROP CONSTRAINT "FK_3859d231547d9c088e84bc2d3bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "update_item" DROP CONSTRAINT "FK_69bb786d38c871aa3756c588f07"`,
    );
    await queryRunner.query(`DROP TABLE "update_section"`);
    await queryRunner.query(`DROP TABLE "update_item"`);
    await queryRunner.query(`DROP TABLE "app_update_news"`);
  }
}
