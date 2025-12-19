import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameColumnIsPremiunToIsPremium1766079511712 implements MigrationInterface {
  name = 'ChangeNameColumnIsPremiunToIsPremium1766079511712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "is_premiun" TO "is_premium"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" RENAME COLUMN "is_premium" TO "is_premiun"');
  }
}
