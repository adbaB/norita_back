import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConstraintCascade1761573897162 implements MigrationInterface {
  name = 'AddConstraintCascade1761573897162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "bibliography" DROP CONSTRAINT "FK_294934302520bb1b216a9dabc31"',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" DROP CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477"',
    );
    await queryRunner.query(
      'ALTER TABLE "glossary" DROP CONSTRAINT "FK_90c7d0003f85148f02febc23bde"',
    );
    await queryRunner.query('ALTER TABLE "notes" DROP CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422"');
    await queryRunner.query(
      'ALTER TABLE "content" DROP CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6"',
    );
    await queryRunner.query(
      'ALTER TABLE "bibliography" ADD CONSTRAINT "FK_294934302520bb1b216a9dabc31" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" ADD CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "glossary" ADD CONSTRAINT "FK_90c7d0003f85148f02febc23bde" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "notes" ADD CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "content" ADD CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "content" DROP CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6"',
    );
    await queryRunner.query('ALTER TABLE "notes" DROP CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422"');
    await queryRunner.query(
      'ALTER TABLE "glossary" DROP CONSTRAINT "FK_90c7d0003f85148f02febc23bde"',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" DROP CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477"',
    );
    await queryRunner.query(
      'ALTER TABLE "bibliography" DROP CONSTRAINT "FK_294934302520bb1b216a9dabc31"',
    );
    await queryRunner.query(
      'ALTER TABLE "content" ADD CONSTRAINT "FK_c7287f4f12809b2c016412fd6a6" FOREIGN KEY ("lesson_uuid") REFERENCES "lessons"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "notes" ADD CONSTRAINT "FK_ebca71624a9cb8b5d5907cd3422" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "glossary" ADD CONSTRAINT "FK_90c7d0003f85148f02febc23bde" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "dialog" ADD CONSTRAINT "FK_d7164e158e1fe5bef8751ae2477" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "bibliography" ADD CONSTRAINT "FK_294934302520bb1b216a9dabc31" FOREIGN KEY ("lesson_content_uuid") REFERENCES "content"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
