import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableItemDiaryAioko1771853970467 implements MigrationInterface {
  name = 'AddTableItemDiaryAioko1771853970467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "japaneseName"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD "name_romaji" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD "name_kanji" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" ADD "imageLocked" character varying`);
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD "imageBiography" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" ADD "imageUnlocked" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user_diary_aiko_items" ADD "is_unlocked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" DROP CONSTRAINT "FK_801218037606831c57fe4247be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ALTER COLUMN "section_uuid" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD CONSTRAINT "FK_801218037606831c57fe4247be3" FOREIGN KEY ("section_uuid") REFERENCES "diary_aiko_sections"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" DROP CONSTRAINT "FK_801218037606831c57fe4247be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ALTER COLUMN "section_uuid" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD CONSTRAINT "FK_801218037606831c57fe4247be3" FOREIGN KEY ("section_uuid") REFERENCES "diary_aiko_sections"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "user_diary_aiko_items" DROP COLUMN "is_unlocked"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "imageUnlocked"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "imageBiography"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "imageLocked"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "name_kanji"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" DROP COLUMN "name_romaji"`);
    await queryRunner.query(`ALTER TABLE "diary_aiko_items" ADD "image" character varying`);
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD "japaneseName" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_aiko_items" ADD "name" character varying(255) NOT NULL`,
    );
  }
}
