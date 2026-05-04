import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResponse } from '../../utils/responses';
import { CreateTypeStructureDto } from '../dtos/create-type-structure.dto';
import { UpdateTypeStructureDto } from '../dtos/update-type-structure.dto';
import { TypeStructure } from '../entities/type-structure.entity';

@Injectable()
export class TypeStructureService {
  constructor(
    @InjectRepository(TypeStructure)
    private readonly typeStructureRepo: Repository<TypeStructure>,
  ) {}

  async findAll(): Promise<TypeStructure[]> {
    return this.typeStructureRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<TypeStructure> {
    const typeStructure = await this.typeStructureRepo.findOne({ where: { id } });
    if (!typeStructure) {
      throw new NotFoundException(`TypeStructure with id ${id} not found`);
    }
    return typeStructure;
  }

  async create(dto: CreateTypeStructureDto): Promise<TypeStructure> {
    const typeStructure = this.typeStructureRepo.create(dto);
    return this.typeStructureRepo.save(typeStructure);
  }

  async update(id: number, dto: UpdateTypeStructureDto): Promise<TypeStructure> {
    const typeStructure = await this.findOne(id);
    Object.assign(typeStructure, dto);
    return this.typeStructureRepo.save(typeStructure);
  }

  async remove(id: number): Promise<DeleteResponse> {
    const deleted = await this.typeStructureRepo.delete({ id });
    if (deleted.affected === 0) {
      throw new NotFoundException(`TypeStructure with id ${id} not found`);
    }
    return { affected: deleted.affected, status: 200 };
  }
}
