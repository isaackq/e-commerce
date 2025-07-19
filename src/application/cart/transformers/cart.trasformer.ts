import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddProductToCartRequestDto } from '../Dtos/request/add-product-to-cart.request.dto';
import { Cart } from '@domain/entities/Cart';
import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { CartRepository } from '@infrastructure/repositories/cart.repository';
import { Customer } from '@domain/entities/User/Customer';
import { CartItem } from '@domain/entities/interfaces/cart-item.interface';

@Injectable()
export class CartTransformer {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}
  async toEntity(cartRequestDto: AddProductToCartRequestDto, user: Customer): Promise<Cart> {
    const product = await this.productRepository.findOne(cartRequestDto.productId);

    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    if (cartRequestDto.quantity > product.stock) {
      throw new NotFoundException('Requested quantity exceeds available stock');
    }
    const cart = await this.cartRepository.findOne(user.cart.id);

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }

    if (cart.items.some((item) => item.product.id === product.id)) {
      throw new ConflictException('Product already exists in cart');
    }

    const cartItem: CartItem = {
      product: product,
      quantityInCart: cartRequestDto.quantity,
      subtotal: cartRequestDto.quantity * product.price,
      notes: cartRequestDto.notes,
    };

    cart.items.push(cartItem);
    cart.totalPrice = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.subtotal, 0);

    return cart;
  }
}
