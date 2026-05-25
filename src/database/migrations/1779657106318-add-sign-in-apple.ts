import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSignInApple1779657106318 implements MigrationInterface {
  name = 'AddSignInApple1779657106318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "sign_in_apple" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sign_in_apple"`);
  }
}
