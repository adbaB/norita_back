import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ScheduleService } from '../services/schedule.service';
import { User } from 'src/users/decorators/user.decorator';
import { Schedule } from '../entities/schedule.entity';

@ApiTags('Schedules')
@Controller('schedules')
@ApiBearerAuth()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Create or update a schedule for a specific day' })
  @Post()
  async createOrUpdate(
    @User() userUuid: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.createOrUpdateSchedule(userUuid, createScheduleDto);
  }

  @ApiOperation({ summary: 'Get all scheduled notifications for the user' })
  @Get()
  async findAll(@User() userUuid: string): Promise<Schedule[]> {
    return this.scheduleService.getScheduledSchedules(userUuid);
  }
}
