import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param() params): Promise<Product> {
    return this.productService.getProduct(params.id);
  }

  @Post()
  @HttpCode(204)
  async createProduct(@Body() product: Product) {
    await this.productService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param() params,
    @Body() product: Product,
  ): Promise<[number, Product[]]> {
    return this.productService.updateProduct(params.id, product);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroyProduct(@Param() params) {
    await this.productService.destroyProduct(params.id);
  }
}
