import { ProductCategory } from '@domain/entities/ProductCategory';

export interface ProductCategoryRepositoryInterface {
  save(productCategory: ProductCategory): Promise<ProductCategory>;
  findOne(id: string): Promise<ProductCategory>;
}
