import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/EnvConfig.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { FileModule } from './files/file.module';
import { LessonProgressModule } from './lessonProgress/lessonProgress.module';
import { LessonsModule } from './lessons/lessons.module';
import { LibraryModule } from './library/library.module';
import { LibraryTypeModule } from './libraryType/libraryType.module';
import { LibraryUserModule } from './libraryUser/libraryUser.module';
import { PackageModule } from './store/store.module';
import { StripeModule } from './stripe/stripe.module';
import { UserCommentsModule } from './userComments/userComments.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './utils/filters/http-exception.catch';
import { TypeormFilterCatch } from './utils/filters/typeormFilter.catch';
import { ResponseInterceptor } from './utils/interceptors/apiResponse.interceptor';

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
    LibraryModule,
    LibraryTypeModule,
    LibraryUserModule,
    PackageModule,
    ScheduleModule.forRoot(),
    ExchangeRateModule,
    StripeModule,
  ],
  controllers: [],
  providers: [
    TypeormFilterCatch,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeormFilterCatch,
    },
  ],
})
export class AppModule {}
