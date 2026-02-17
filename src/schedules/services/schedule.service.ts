import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';
import { Repository } from 'typeorm';

export class ScheduleService {
  constructor(@InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron(): void {
    console.log(new Date());
  }
}
