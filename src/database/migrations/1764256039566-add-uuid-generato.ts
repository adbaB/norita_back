import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUuidGenerato1764256039566 implements MigrationInterface {
  name = 'AddUuidGenerato1764256039566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item" DROP CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9"',
    );
    await queryRunner.query(
      'ALTER TABLE "library_section" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9" FOREIGN KEY ("library_section_uuid") REFERENCES "library_section"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "library_item" DROP CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9"',
    );
    await queryRunner.query('ALTER TABLE "library_section" ALTER COLUMN "uuid" DROP DEFAULT');
    await queryRunner.query(
      'ALTER TABLE "library_item" ADD CONSTRAINT "FK_dbe02b4602bd253ee3f9a2b71d9" FOREIGN KEY ("library_section_uuid") REFERENCES "library_section"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
