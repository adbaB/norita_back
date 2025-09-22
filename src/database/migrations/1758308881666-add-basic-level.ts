import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBasicLevel1758308881666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'Introducción\', 0, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'JLPT1\', 1, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'JLPT2\', 2, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'JLPT3\', 3, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'JLPT4\', 4, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid", title, "order", updated_at) VALUES(uuid_generate_v4(), \'JLPT5\', 5, now())',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public."level"');
  }
}
