import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as ClassApiResponse, UpdateResponse } from '../../utils/responses';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() body: CreateProductDto): Promise<ClassApiResponse<Product>> {
    return new ClassApiResponse(
      true,
      'Product created successfully',
      await this.productsService.create(body),
    );
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<Product> {
    return this.productsService.findOne(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ClassApiResponse<UpdateResponse>> {
    return new ClassApiResponse(
      true,
      'Product updated successfully',
      await this.productsService.update(uuid, updateProductDto),
    );
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<ClassApiResponse<void>> {
    return new ClassApiResponse(
      true,
      'Product deleted successfully',
      await this.productsService.remove(uuid),
    );
  }
}
