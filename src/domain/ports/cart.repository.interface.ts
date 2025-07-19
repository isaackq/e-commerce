import { Cart } from '@domain/entities/Cart';

export interface CartRepositoryInterface {
  addProductToCart(cart: Cart): Promise<Cart>;
  findOne(id: string): Promise<Cart>;
}
