import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }
  async getProduct(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }
  async createProduct(product: Product) {
    return this.productModel.create(product);
  }
  async updateProduct(
    id: number,
    product: Product,
  ): Promise<[number, Product[]]> {
    return this.productModel.update(product, {
      where: {
        id: product.id,
      },
    });
  }
  async destroyProduct(id: number) {
    const product: Product = await this.getProduct(id);
    return product.destroy();
  }
}
