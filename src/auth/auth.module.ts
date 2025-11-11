import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategys/jwt.strategy';
import { JwtRefreshStrategy } from './strategys/refresh.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: configService.jwt.expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshGuard,
    JwtRefreshStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
