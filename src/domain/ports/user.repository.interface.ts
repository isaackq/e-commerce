// import { Product } from '../entities/Product';
import { User } from '../entities/User/User';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  createCustomer(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
  findOne(id: string): Promise<User | null>;
  // findOneByEmail(email: string): Promise<User | null>;
  // addToCart(Product: Product | Product[], userId: string); //cuurent  user
  // addToFavorites(Product: Product | Product[], userId: string); //cuurent  user
}
