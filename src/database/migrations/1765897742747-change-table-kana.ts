import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableKana1765897742747 implements MigrationInterface {
  name = 'ChangeTableKana1765897742747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" DROP CONSTRAINT "FK_8f2793cd826609f37f6a8218584"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ADD "traductionSpanish" jsonb NOT NULL DEFAULT \'[]\'',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "word" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ADD CONSTRAINT "UQ_7ccb33ced48305d07d6e0e7ae78" UNIQUE ("word")',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ADD CONSTRAINT "FK_8f2793cd826609f37f6a8218584" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" DROP CONSTRAINT "FK_8f2793cd826609f37f6a8218584"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" DROP CONSTRAINT "UQ_7ccb33ced48305d07d6e0e7ae78"',
    );
    await queryRunner.query('ALTER TABLE "library_item_kana" ALTER COLUMN "word" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "library_item_kana" DROP COLUMN "traductionSpanish"');
    await queryRunner.query(
      'ALTER TABLE "library_item_kana" ADD CONSTRAINT "FK_8f2793cd826609f37f6a8218584" FOREIGN KEY ("library_item_uuid") REFERENCES "library_item"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
