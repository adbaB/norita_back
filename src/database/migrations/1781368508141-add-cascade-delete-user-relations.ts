import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeDeleteUserRelations1781368508141 implements MigrationInterface {
  name = 'AddCascadeDeleteUserRelations1781368508141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // --- user_likes: FK hacia user (user_uuid) ---
    await queryRunner.query(
      `ALTER TABLE "user_likes" DROP CONSTRAINT "FK_971b953f99d545162a481e43aa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_likes" ADD CONSTRAINT "FK_971b953f99d545162a481e43aa8" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // --- user_likes: FK hacia comment (comment_uuid) ---
    await queryRunner.query(
      `ALTER TABLE "user_likes" DROP CONSTRAINT "FK_5b45cc3753f7972cae546076e82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_likes" ADD CONSTRAINT "FK_5b45cc3753f7972cae546076e82" FOREIGN KEY ("comment_uuid") REFERENCES "comment"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // --- comment: FK hacia user (user_uuid) ---
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // --- library_section_user: FK hacia user (user_uuid) ---
    await queryRunner.query(
      `ALTER TABLE "library_section_user" DROP CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ADD CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // --- library_user: FK hacia user (user_uuid) ---
    await queryRunner.query(
      `ALTER TABLE "library_user" DROP CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ADD CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir library_user
    await queryRunner.query(
      `ALTER TABLE "library_user" DROP CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_user" ADD CONSTRAINT "FK_027ab0d439d9db9b8e97b334fff" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Revertir library_section_user
    await queryRunner.query(
      `ALTER TABLE "library_section_user" DROP CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091"`,
    );
    await queryRunner.query(
      `ALTER TABLE "library_section_user" ADD CONSTRAINT "FK_4baeaf44ed29af4ed2c33b6e091" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Revertir comment
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_27ce1f8f32138a1a68bd92cff7d" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Revertir user_likes → comment
    await queryRunner.query(
      `ALTER TABLE "user_likes" DROP CONSTRAINT "FK_5b45cc3753f7972cae546076e82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_likes" ADD CONSTRAINT "FK_5b45cc3753f7972cae546076e82" FOREIGN KEY ("comment_uuid") REFERENCES "comment"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Revertir user_likes → user
    await queryRunner.query(
      `ALTER TABLE "user_likes" DROP CONSTRAINT "FK_971b953f99d545162a481e43aa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_likes" ADD CONSTRAINT "FK_971b953f99d545162a481e43aa8" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
