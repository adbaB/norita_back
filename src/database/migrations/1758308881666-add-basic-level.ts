import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBasicLevel1758308881666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid",level, title,description, "order", updated_at) VALUES(uuid_generate_v4(),1, \'Novato\',\'Soy una hoja en blanco\', 0, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid",level, title,description, "order", updated_at) VALUES(uuid_generate_v4(),2, \'Principiante\',\'Tengo las bases del Japonés\', 1, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid",level, title,description, "order", updated_at) VALUES(uuid_generate_v4(),3, \'Intermedio\',\'Sé defenderme en Japonés.\', 2, now())',
    );
    await queryRunner.query(
      'INSERT INTO public."level" ("uuid",level, title,description, "order", updated_at) VALUES(uuid_generate_v4(),4, \'Avanzado\',\'No hay nadie quien me detenga en Japonés.\', 3, now())',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public."level"');
  }
}
