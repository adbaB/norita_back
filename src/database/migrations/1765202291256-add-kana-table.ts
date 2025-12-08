import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKanaTable1765202291256 implements MigrationInterface {
  name = 'AddKanaTable1765202291256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "library_item_kana" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio" jsonb NOT NULL DEFAULT \'{"male":"","female":""}\', "consonant" jsonb NOT NULL DEFAULT \'[]\', "error" jsonb NOT NULL DEFAULT \'[]\', "lottie" character varying(255), "pronunciation" jsonb NOT NULL DEFAULT \'[]\', "romanji" jsonb NOT NULL DEFAULT \'{"hepburn":"","kunreishiki":"","nihonshiki":""}\', "images" jsonb NOT NULL DEFAULT \'[]\', "steps" character varying(250), "final_image" character varying(255), "word" character varying(255), "library_item_uuid" uuid, CONSTRAINT "REL_8f2793cd826609f37f6a821858" UNIQUE ("library_item_uuid"), CONSTRAINT "PK_fbe685b522d20e2d75a2322680e" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "audio"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "error"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "pronunciation"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "romanji"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "images"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "final_image"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "word"');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "lottie"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"library_item_type_enum\" AS ENUM('adjective', 'counter', 'kana', 'kanji', 'numbers', 'number', 'radical', 'verb', 'onomatopoeia', 'vocabulary')",
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "type" "public"."library_item_type_enum" NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "library_item" ALTER COLUMN "package" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ADD CONSTRAINT "FK_8f2793cd826609f37f6a8218584" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" DROP CONSTRAINT "FK_8f2793cd826609f37f6a8218584"',
    );
    await queryRunner.query('ALTER TABLE "library_item" ALTER COLUMN "package" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "library_item" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."library_item_type_enum"');
    await queryRunner.query('ALTER TABLE "library_item" ADD "lottie" character varying(255)');
    await queryRunner.query('ALTER TABLE "library_item" ADD "word" character varying(255)');
    await queryRunner.query('ALTER TABLE "library_item" ADD "final_image" character varying(255)');
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "images" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "romanji" jsonb NOT NULL DEFAULT \'{"hepburn": "", "nihonshiki": "", "kunreishiki": ""}\'',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "pronunciation" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query('ALTER TABLE "library_item" ADD "error" jsonb NOT NULL DEFAULT \'[]\'');
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD "audio" jsonb NOT NULL DEFAULT \'{"male": "", "female": ""}\'',
    );
    await queryRunner.query('DROP TABLE "library_item_kana"');
  }
}
