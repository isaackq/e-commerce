import { Product } from '@domain/entities/Product';
import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { ProductMapper } from '@infrastructure/mappers/product.mapper';
import { ProductDocument, Product as productSchema } from '@infrastructure/schemas/product.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectModel(productSchema.name)
    private readonly productModel: Model<productSchema>,
  ) {}

  async save(product: Product): Promise<Product> {
    const existingProduct = await this.productModel.findOne({ name: product.name }).exec();

    if (existingProduct) {
      throw new ConflictException('A product with the same name already exists.');
    }

    const createdProduct = await this.productModel.create({
      ...product,
      category: product.category.id,
      admin: product.admin ? product.admin.id : '',
      seller: product.seller ? product.seller.id : '',
    });

    const populateFeilds = this.populateFeilds(createdProduct);
    return ProductMapper.map(await createdProduct.populate(populateFeilds));
  }

  async findOne(id: string): Promise<Product> {
    const productDocument = await this.productModel.findById(id);

    if (!productDocument) {
      return null;
    }
    const populateFeilds = this.populateFeilds(productDocument);
    return ProductMapper.map(await productDocument.populate(populateFeilds));
  }

  private populateFeilds(productDocument: ProductDocument) {
    const populateFeilds = ['category'];
    if (productDocument.admin) {
      populateFeilds.push('admin');
    }
    if (productDocument.seller) {
      populateFeilds.push('seller');
    }
    return populateFeilds.join(' ');
  }
}
