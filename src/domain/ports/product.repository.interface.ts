import { Product } from '@domain/entities/Product';

export interface ProductRepositoryInterface {
  save(product: Product): Promise<Product>;
  findOne(id: string): Promise<Product>;
}
