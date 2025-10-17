import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})
export class EnvConfigModule {}
