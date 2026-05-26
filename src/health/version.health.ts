import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus';

@Injectable()
export class VersionHealthIndicator {
  constructor(private healthIndicatorService: HealthIndicatorService) {}

  isHealthy(key: string): HealthIndicatorResult {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const packageJson = require('../../package.json');
    return this.healthIndicatorService.check(key).up({ version: packageJson.version });
  }
}
