import { Cart } from '@domain/entities/Cart';

export interface CartRepositoryInterface {
  saveCart(cart: Cart): Promise<Cart>;
  findOne(id: string): Promise<Cart>;
  clearCart(id: string): Promise<Cart>;
}
