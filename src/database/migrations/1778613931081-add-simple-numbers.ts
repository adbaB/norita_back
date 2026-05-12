import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSimpleNumbers1778613931081 implements MigrationInterface {
  name = 'AddSimpleNumbers1778613931081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "library_item_simple_numbers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "roman" character varying(255), "kanji" character varying(255), "hiragana" character varying(255), "romaji" character varying(255), "audio" jsonb DEFAULT '{}', "library_item_uuid" uuid, CONSTRAINT "REL_9eb56e5c7299fe49f86faea579" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_3cbd9a336ff2b3dcefd17a27364" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_simple_numbers" ADD CONSTRAINT "FK_9eb56e5c7299fe49f86faea579d" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_simple_numbers" DROP CONSTRAINT "FK_9eb56e5c7299fe49f86faea579d"`,
    );
    await queryRunner.query(`DROP TABLE "library_item_simple_numbers"`);
  }
}
