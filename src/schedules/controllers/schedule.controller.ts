import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ScheduleService } from '../services/schedule.service';
import { User } from 'src/users/decorators/user.decorator';
import { Schedule } from '../entities/schedule.entity';

@ApiTags('Schedules')
@Controller('schedules')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a schedule for a specific day' })
  async createOrUpdate(
    @User() userUuid: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.createOrUpdateSchedule(userUuid, createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scheduled notifications for the user' })
  async findAll(@User() userUuid: string): Promise<Schedule[]> {
    return this.scheduleService.getScheduledSchedules(userUuid);
  }
}
