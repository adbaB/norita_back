import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesAdjetiveRadicasOnoma1765299818912 implements MigrationInterface {
  name = 'AddTablesAdjetiveRadicasOnoma1765299818912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "library_item_adjectives" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "adjective" jsonb, "adjectiveType" character varying(255), "audio" jsonb NOT NULL DEFAULT \'{"male":"","female":""}\', "conditionals" jsonb NOT NULL DEFAULT \'{}\', "conjugations" jsonb NOT NULL DEFAULT \'{}\', "example" jsonb NOT NULL DEFAULT \'[]\', "jltp" character varying(50), "note" jsonb NOT NULL DEFAULT \'[]\', "termination" jsonb NOT NULL DEFAULT \'{}\', "traductionSpanish" jsonb NOT NULL DEFAULT \'[]\', "library_item_uuid" uuid, CONSTRAINT "REL_2319ff0c9566722d789b7a56f3" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_055158e9491b4c0cd72f6578996" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "library_item_counters" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" jsonb NOT NULL DEFAULT \'[]\', "example" jsonb NOT NULL DEFAULT \'[]\', "exampleSpanish" jsonb NOT NULL DEFAULT \'[]\', "hiraganaNumber" jsonb NOT NULL DEFAULT \'[]\', "jltp" character varying(255), "kanjiNumber" jsonb NOT NULL DEFAULT \'[]\', "note" jsonb NOT NULL DEFAULT \'[]\', "romajiNumber" jsonb NOT NULL DEFAULT \'[]\', "romanNumber" jsonb NOT NULL DEFAULT \'[]\', "traductionSpanish" jsonb NOT NULL DEFAULT \'[]\', "word" character varying(255) NOT NULL, "wordHiragana" jsonb NOT NULL DEFAULT \'[]\', "wordRomaji" jsonb NOT NULL DEFAULT \'[]\', "library_item_uuid" uuid, CONSTRAINT "REL_2a3e04aeba35ed8b014b195f36" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_6d74888dd98e6694642919721f2" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "library_item_onomatopoeia" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio" jsonb NOT NULL DEFAULT \'{"male":"","female":""}\', "example" jsonb NOT NULL DEFAULT \'[]\', "frequency" character varying(50), "note" jsonb NOT NULL DEFAULT \'[]\', "onomatopoeiaType" character varying(50), "traductionSpanish" jsonb NOT NULL DEFAULT \'[]\', "word" jsonb NOT NULL DEFAULT \'[]\', "wordKatakana" jsonb NOT NULL DEFAULT \'[]\', "wordRomaji" jsonb NOT NULL DEFAULT \'[]\', "library_item_uuid" uuid, CONSTRAINT "REL_0fb91df2fb40b2b3b73a095cdd" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_8f4db78865e65b17aca76c876ba" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "library_item_radicals" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "lottie" character varying(255), "note" character varying(255), "position" jsonb NOT NULL DEFAULT \'[]\', "stepsInteger" integer NOT NULL, "traductionSpanish" jsonb NOT NULL DEFAULT \'[]\', "variants" jsonb NOT NULL DEFAULT \'[]\', "word" jsonb NOT NULL DEFAULT \'[]\', "wordHiragana" jsonb NOT NULL DEFAULT \'[]\', "wordRomaji" jsonb NOT NULL DEFAULT \'[]\', "library_item_uuid" uuid, CONSTRAINT "REL_c19f2f3b6adc197d3b8a17a37c" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_9128abab0b87cef16980cf25b10" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" ADD CONSTRAINT "FK_2319ff0c9566722d789b7a56f33" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" ADD CONSTRAINT "FK_2a3e04aeba35ed8b014b195f361" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" ADD CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" ADD CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_radicals" DROP CONSTRAINT "FK_c19f2f3b6adc197d3b8a17a37c0"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_onomatopoeia" DROP CONSTRAINT "FK_0fb91df2fb40b2b3b73a095cdd8"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_counters" DROP CONSTRAINT "FK_2a3e04aeba35ed8b014b195f361"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_adjectives" DROP CONSTRAINT "FK_2319ff0c9566722d789b7a56f33"',
    );
    await queryRunner.query('DROP TABLE "library_item_radicals"');
    await queryRunner.query('DROP TABLE "library_item_onomatopoeia"');
    await queryRunner.query('DROP TABLE "library_item_counters"');
    await queryRunner.query('DROP TABLE "library_item_adjectives"');
  }
}
