import { MigrationInterface, QueryRunner } from 'typeorm';

export class diaryAikoItems1771875284105 implements MigrationInterface {
  name = 'diaryAikoItems1771875284105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "diary_aiko_items" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_romaji" character varying(255) NOT NULL, "name_kanji" character varying(255), "imageLocked" character varying, "imageBiography" character varying, "imageUnlocked" character varying, "attributes" jsonb, "bio" text, "lesson_uuid" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "section_uuid" uuid, CONSTRAINT "PK_3817a51ea14c8d2cacab6f721d4" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_diary_aiko_items" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_unlocked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_uuid" uuid, "item_uuid" uuid, CONSTRAINT "UQ_59bc8b2d96c486c07c27e661b88" UNIQUE ("user_uuid", "item_uuid"), CONSTRAINT "PK_19c046b1640445e17609a5d7b97" PRIMARY KEY ("uuid"))',
    );

    await queryRunner.query(
      'ALTER TABLE "diary_aiko_items" ADD CONSTRAINT "FK_801218037606831c57fe4247be3" FOREIGN KEY ("section_uuid") REFERENCES "diary_aiko_sections"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_diary_aiko_items" ADD CONSTRAINT "FK_21d8ba44356edb05ffc22ac6ced" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_diary_aiko_items" ADD CONSTRAINT "FK_46f2620988151519322a5c0bd85" FOREIGN KEY ("item_uuid") REFERENCES "diary_aiko_items"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_diary_aiko_items" DROP CONSTRAINT "FK_46f2620988151519322a5c0bd85"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_diary_aiko_items" DROP CONSTRAINT "FK_21d8ba44356edb05ffc22ac6ced"',
    );
    await queryRunner.query(
      'ALTER TABLE "diary_aiko_items" DROP CONSTRAINT "FK_801218037606831c57fe4247be3"',
    );
    await queryRunner.query('DROP TABLE "user_diary_aiko_items"');
    await queryRunner.query('DROP TABLE "diary_aiko_items"');
  }
}
