import { CartTransformer } from '@application/cart/transformers/cart.trasformer';
import { AddProductToCartUsecase } from '@application/cart/usercase/add-product-to-cart.usecase';
import { CartController } from '@infrastructure/controllers/Cart.controller';
import { Cart, CartSchema } from '@infrastructure/schemas/cart.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product.module';
import { CartRepository } from '@infrastructure/repositories/cart.repository';
import { GetCustomerCartUsecase } from '@application/cart/usercase/get-customer-cart.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), ProductModule],
  controllers: [CartController],
  providers: [
    AddProductToCartUsecase,
    CartTransformer,
    GetCustomerCartUsecase,
    { provide: 'CartRepository', useClass: CartRepository },
  ],
})
export class CartModule {}
