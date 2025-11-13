import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResponse } from '../../utils/responses';
import { NoteDTO } from '../dtos/note.dto';
import { Content } from '../entities/content.entity';
import { Notes } from '../entities/notes.entity';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Notes) private readonly noteRepo: Repository<Notes>) {}

  async create(lessonContent: Content, notes: NoteDTO[]): Promise<Notes[]> {
    if (notes.length === 0) {
      return [];
    }
    const newNotes = notes.map((note) => {
      const newNote = this.noteRepo.create(note);
      newNote.lessonContent = lessonContent;
      return newNote;
    });

    return this.noteRepo.save(newNotes);
  }

  async update(lessonContent: Content, notes: NoteDTO[]): Promise<void> {
    if (notes?.length === 0) {
      return;
    }

    await this.noteRepo.delete({ lessonContent: { uuid: lessonContent.uuid } });
    await this.create(lessonContent, notes);
  }

  async delete(uuid: string): Promise<DeleteResponse> {
    const deleted = await this.noteRepo.delete({ uuid });

    if (deleted.affected === 0) {
      throw new NotFoundException('Note not found');
    }
    return {
      affected: deleted.affected,
      status: 200,
    };
  }
}
