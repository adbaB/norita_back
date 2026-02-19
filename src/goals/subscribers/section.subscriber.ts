import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Section } from '../../lessons/entities/section.entity';
import { Goal } from '../entities/goal.entity';

@Injectable()
@EventSubscriber()
export class SectionSubscriber implements EntitySubscriberInterface<Section> {
  listenTo(): typeof Section {
    return Section;
  }

  async afterInsert(event: InsertEvent<Section>): Promise<void> {
    const section = event.entity;
    const goalRepository = event.manager.getRepository(Goal);

    const goal = goalRepository.create({
      title: `Complete ${section.name}`,
      description: `Finish all lessons in the ${section.name} section.`,
      section: section,
    });

    await goalRepository.save(goal);
    // console.log(`Goal created for section: ${section.name}`);
  }
}
