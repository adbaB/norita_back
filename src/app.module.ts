import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/EnvConfig.module';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './files/file.module';
import { LessonProgressModule } from './lessonProgress/lessonProgress.module';
import { LessonsModule } from './lessons/lessons.module';
import { UserCommentsModule } from './userComments/userComments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    LessonsModule,
    LessonProgressModule,
    UserCommentsModule,
    FileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
