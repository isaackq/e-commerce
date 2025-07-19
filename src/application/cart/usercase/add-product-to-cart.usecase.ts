import { Inject, Injectable } from '@nestjs/common';
import { CartTransformer } from '../transformers/cart.trasformer';
import { User } from '@domain/entities/User/User';
import { AddProductToCartRequestDto } from '../Dtos/request/add-product-to-cart.request.dto';
import { Customer } from '@domain/entities/User/Customer';
import { CartResponseDto } from '../Dtos/response/cart.response.dto';
import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';

@Injectable()
export class AddProductToCartUsecase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepositoryInterface,
    private readonly cartTransformer: CartTransformer,
  ) {}

  async execute(addProductToCartRequestDto: AddProductToCartRequestDto, user: User) {
    const cart = await this.cartTransformer.toEntity(addProductToCartRequestDto, user as Customer);

    return CartResponseDto.createFromEntity(await this.cartRepository.addProductToCart(cart));
  }
}
