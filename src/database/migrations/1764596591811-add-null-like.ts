import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullLike1764596591811 implements MigrationInterface {
  name = 'AddNullLike1764596591811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user_likes" ALTER COLUMN "isLike" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE "user_likes" SET "isLike" = false WHERE "isLike" IS NULL');
    await queryRunner.query('ALTER TABLE "user_likes" ALTER COLUMN "isLike" SET NOT NULL');
  }
}
