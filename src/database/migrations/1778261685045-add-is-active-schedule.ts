import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveSchedule1778261685045 implements MigrationInterface {
  name = 'AddIsActiveSchedule1778261685045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dialog" DROP CONSTRAINT "FK_dialog_type_structure"`);
    await queryRunner.query(`ALTER TABLE "schedules" ADD "isActive" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(
      `ALTER TABLE "dialog" ADD CONSTRAINT "FK_e13a41b9c171ffee6a4d9db5789" FOREIGN KEY ("type_structure_id") REFERENCES "type_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dialog" DROP CONSTRAINT "FK_e13a41b9c171ffee6a4d9db5789"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "dialog" ADD CONSTRAINT "FK_dialog_type_structure" FOREIGN KEY ("type_structure_id") REFERENCES "type_structure"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }
}
