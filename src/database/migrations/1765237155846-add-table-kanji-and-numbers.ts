import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableKanjiAndNumbers1765237155846 implements MigrationInterface {
  name = 'AddTableKanjiAndNumbers1765237155846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "library_item_kanji" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "kind" jsonb NOT NULL DEFAULT \'{"hyougai":"","jinmeiyou":"","kyuujitai":"","shinjitai":""}\', "kunyomi" jsonb NOT NULL DEFAULT \'[]\', "level" jsonb NOT NULL DEFAULT \'{"jouyou":"","jlpt":""}\', "lottie" character varying(255), "name" jsonb NOT NULL DEFAULT \'[]\', "notes" jsonb NOT NULL DEFAULT \'[]\', "onyomi" jsonb NOT NULL DEFAULT \'[]\', "package" character varying(255) NOT NULL, "images" jsonb NOT NULL DEFAULT \'[]\', "traductionsSpanish" jsonb NOT NULL DEFAULT \'[]\', "word" jsonb NOT NULL DEFAULT \'[]\', "radical_element" character varying(255), "radical_key" character varying(255), "library_item_uuid" uuid, CONSTRAINT "REL_0c467285bb31bbf12c35f6fe70" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_030f435684656875e6741b4dc28" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "library_item_numbers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio" jsonb NOT NULL DEFAULT \'{"male":"","female":""}\', "kunyomi" jsonb NOT NULL DEFAULT \'[]\', "lottie" character varying(255), "note" text, "onyomi" jsonb NOT NULL DEFAULT \'[]\', "package" character varying(255) NOT NULL, "romanNumber" character varying(50) NOT NULL, "stepImage" jsonb NOT NULL DEFAULT \'[]\', "translation" character varying(255), "word" character varying(50), "library_item_uuid" uuid, CONSTRAINT "REL_3d118842b9bd84c94e28428e21" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_083473f8b0b0e08c363b7ca6fc9" PRIMARY KEY ("uuid"))',
    );

    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" ADD CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" ADD CONSTRAINT "FK_3d118842b9bd84c94e28428e210" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_numbers" DROP CONSTRAINT "FK_3d118842b9bd84c94e28428e210"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kanji" DROP CONSTRAINT "FK_0c467285bb31bbf12c35f6fe70f"',
    );
    await queryRunner.query('DROP TABLE "library_item_numbers"');
    await queryRunner.query('DROP TABLE "library_item_kanji"');
  }
}
