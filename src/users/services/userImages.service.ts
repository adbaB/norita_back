import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserImagesDto } from '../dto/userImages/create-userImages.dto';
import { UserImages } from '../entities/userImages.entity';

@Injectable()
export class UserImagesService {
  constructor(
    @InjectRepository(UserImages)
    private readonly userImagesRepo: Repository<UserImages>,
  ) {}

  async create(createUserImagesDto: CreateUserImagesDto): Promise<UserImages> {
    const userImage = this.userImagesRepo.create(createUserImagesDto);
    return this.userImagesRepo.save(userImage);
  }

  async findAll(): Promise<UserImages[]> {
    return this.userImagesRepo.find();
  }

  async findOne(uuid: string): Promise<UserImages> {
    const userImage = await this.userImagesRepo.findOne({
      where: { uuid },
    });

    if (!userImage) {
      throw new NotFoundException(`UserImage with UUID ${uuid} not found`);
    }

    return userImage;
  }

  async getRandomImage(): Promise<UserImages> {
    const images = await this.userImagesRepo.find();

    if (images.length <= 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  async remove(uuid: string): Promise<void> {
    const userImage = await this.findOne(uuid);
    await this.userImagesRepo.remove(userImage);
  }
}
