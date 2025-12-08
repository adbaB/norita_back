import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSteps1765207293914 implements MigrationInterface {
    name = 'RemoveSteps1765207293914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "library_item_kana" DROP COLUMN "steps"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "library_item_kana" ADD "steps" character varying(250)`);
    }

}
