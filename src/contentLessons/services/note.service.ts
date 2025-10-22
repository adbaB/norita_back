import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
