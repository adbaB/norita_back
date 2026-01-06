import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Library } from '../../library/entities/library.entity';
import { UpdateResponse } from '../../utils/responses';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { libraryIds, ...productData } = createProductDto;

    const libraries = await this.libraryRepository.findBy({
      uuid: In(libraryIds),
    });

    if (libraries.length !== libraryIds.length) {
      throw new NotFoundException('One or more libraries not found');
    }

    const product = this.productRepository.create({
      ...productData,
      libraries,
    });

    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['libraries'] });
  }

  async findOne(uuid: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { uuid },
      relations: ['libraries'],
    });

    if (!product) {
      throw new NotFoundException(`Product with UUID ${uuid} not found`);
    }

    return product;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto): Promise<UpdateResponse> {
    const product = await this.findOne(uuid);
    const { libraryIds, ...productData } = updateProductDto;

    if (libraryIds) {
      const libraries = await this.libraryRepository.findBy({
        uuid: In(libraryIds),
      });

      if (libraries.length !== libraryIds.length) {
        throw new NotFoundException('One or more libraries not found');
      }
      product.libraries = libraries;
    }

    Object.assign(product, productData);

    const affected = await this.productRepository.update(uuid, product);
    return {
      affected: affected.affected,
      status: affected.affected === 0 ? 204 : 200,
    };
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.productRepository.delete(uuid);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with UUID ${uuid} not found`);
    }
  }
}
