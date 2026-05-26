import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheckResult,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { IsPublic } from '../auth/decorators/isPublic.decorator';
import { VersionHealthIndicator } from './version.health';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private version: VersionHealthIndicator,
  ) {}

  @IsPublic()
  @ApiOperation({ summary: 'API Health check' })
  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
      (): HealthIndicatorResult => this.version.isHealthy('api_version'),
    ]);
  }
}
