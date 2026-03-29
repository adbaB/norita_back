import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableColumns1774808051412 implements MigrationInterface {
  name = 'AddNullableColumns1774808051412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ADD "searchKanji" jsonb DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "audio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "audio" SET DEFAULT '{"male":"","female":""}'`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "kind" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "library_item_kanji" ALTER COLUMN "kind" SET DEFAULT '{"hyougai":"","jinmeiyou":"","kyuujitai":"","shinjitai":""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_kanji" ALTER COLUMN "kunyomi" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "notes" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "onyomi" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "images" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET DEFAULT '{"male":"","female":""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_onomatopoeia" ALTER COLUMN "audio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_onomatopoeia" ALTER COLUMN "audio" SET DEFAULT '{"male":"","female":""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_radicals" ALTER COLUMN "variants" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "audio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "audio" SET DEFAULT '{"male":"","female":""}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "audio" SET DEFAULT '{"male": "", "female": ""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_vocabulary" ALTER COLUMN "audio" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_radicals" ALTER COLUMN "variants" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_onomatopoeia" ALTER COLUMN "audio" SET DEFAULT '{"male": "", "female": ""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_onomatopoeia" ALTER COLUMN "audio" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET DEFAULT '{"male": "", "female": ""}'`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_numbers" ALTER COLUMN "audio" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "images" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "onyomi" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "notes" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "kunyomi" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "library_item_kanji" ALTER COLUMN "kind" SET DEFAULT '{"hyougai": "", "jinmeiyou": "", "kyuujitai": "", "shinjitai": ""}'`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_kanji" ALTER COLUMN "kind" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "audio" SET DEFAULT '{"male": "", "female": ""}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_item_adjectives" ALTER COLUMN "audio" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library_item_adjectives" DROP COLUMN "searchKanji"`);
  }
}
