import { ProductTransformer } from '@application/product/trasformers/product.transformer';
import { CreateProductUsecase } from '@application/product/usecase/create-product.usercase';
import { ProductController } from '@infrastructure/controllers/Product.controller';
import { ProductRepository } from '@infrastructure/repositories/product.repository';
import { Product, ProductSchema } from '@infrastructure/schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoryModule } from './product-category.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), ProductCategoryModule],
  providers: [{ provide: 'ProductRepository', useClass: ProductRepository }, CreateProductUsecase, ProductTransformer],
  controllers: [ProductController],
  exports: [{ provide: 'ProductRepository', useClass: ProductRepository }],
})
export class ProductModule {}
