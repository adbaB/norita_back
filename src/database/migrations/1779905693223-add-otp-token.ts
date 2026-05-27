import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpToken1779905693223 implements MigrationInterface {
  name = 'AddOtpToken1779905693223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "reset_password_otp" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" ADD "reset_password_otp_expires_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_password_otp_expires_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_password_otp"`);
  }
}
