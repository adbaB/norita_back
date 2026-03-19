import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from '../entities/goal.entity';
import { UserGoal } from '../entities/user-goal.entity';
import { Section } from '../../lessons/entities/section.entity';
import { LessonProgressService } from 'src/lessonProgress/services/lessonProgress.service';
import { UsersService } from 'src/users/services/users.service';
import { UpdateGoalDto } from '../dto/update-goal.dto';
import { GoalProgressResponseDto } from '../dto/goal-progress-response.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
    @InjectRepository(UserGoal)
    private readonly userGoalRepo: Repository<UserGoal>,

    private readonly lessonProgressService: LessonProgressService,
    private readonly usersService: UsersService,
  ) {}

  async createGoalForSection(section: Section): Promise<Goal> {
    const goal = this.goalRepo.create({
      title: `Complete ${section.name}`,
      description: `Finish all lessons in the ${section.name} section.`,
      section,
    });
    return this.goalRepo.save(goal);
  }

  @Transactional()
  async claimGoal(userUuid: string, goalUuid: string): Promise<UserGoal> {
    const goal = await this.goalRepo.findOne({
      where: { uuid: goalUuid },
      relations: { section: { lessons: true } },
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    // Check if user has already claimed the goal
    const existingUserGoal = await this.userGoalRepo.findOne({
      where: { user: { uuid: userUuid }, goal: { uuid: goalUuid } },
    });

    if (existingUserGoal && existingUserGoal.isClaimed) {
      throw new BadRequestException('Goal already claimed');
    }

    // Verify all lessons in the section are completed
    const sectionLessons = goal.section.lessons;
    if (!sectionLessons || sectionLessons.length === 0) {
      throw new BadRequestException('Section has no lessons to complete.');
    }

    const lessonUuids = sectionLessons.map((l) => l.uuid);

    const completedCount = await this.lessonProgressService.countCompletedLessons(
      userUuid,
      lessonUuids,
    );

    if (completedCount !== sectionLessons.length) {
      throw new BadRequestException('Not all lessons in the section are completed.');
    }

    let userGoal = existingUserGoal;

    if (userGoal) {
      userGoal.isClaimed = true;
      userGoal.claimedAt = new Date();
    } else {
      userGoal = this.userGoalRepo.create({
        user: { uuid: userUuid },
        goal,
        isClaimed: true,
        claimedAt: new Date(),
      });
    }

    await this.userGoalRepo.save(userGoal);

    if (goal.reward > 0) {
      await this.usersService.increaseCoins(userUuid, goal.reward);
    }

    return userGoal;
  }

  async findAll(): Promise<Goal[]> {
    return this.goalRepo.find();
  }

  async findAllWithProgress(userUuid: string): Promise<GoalProgressResponseDto[]> {
    const goals = await this.goalRepo.find({
      relations: { section: { lessons: true } },
    });

    const userGoals = await this.userGoalRepo.find({
      where: { user: { uuid: userUuid } },
      relations: { goal: true },
    });

    const userGoalMap = new Map(userGoals.map((ug) => [ug.goal.uuid, ug]));

    const progressPromises = goals.map(async (goal) => {
      const sectionLessons = goal.section?.lessons || [];
      const totalLessons = sectionLessons.length;
      let completedCount = 0;

      if (totalLessons > 0) {
        const lessonUuids = sectionLessons.map((l) => l.uuid);
        completedCount = await this.lessonProgressService.countCompletedLessons(
          userUuid,
          lessonUuids,
        );
      }

      const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
      const completed = totalLessons > 0 && completedCount === totalLessons;

      const userGoal = userGoalMap.get(goal.uuid);
      const isClaimed = userGoal?.isClaimed || false;

      return {
        ...goal,
        progress: Math.round(progress), // Round to nearest integer for percentage
        completed,
        isClaimed,
      } as GoalProgressResponseDto;
    });

    return Promise.all(progressPromises);
  }

  async update(uuid: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    const goal = await this.goalRepo.findOneBy({ uuid });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    Object.assign(goal, updateGoalDto);
    return this.goalRepo.save(goal);
  }
}
