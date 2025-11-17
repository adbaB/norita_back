import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIndexLesson1763394297579 implements MigrationInterface {
  name = 'RemoveIndexLesson1763394297579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_633a748d9720d4c3c25f0fc120"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_633a748d9720d4c3c25f0fc120" ON "lessons" ("order") ',
    );
  }
}
