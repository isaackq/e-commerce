import { ProductsCategoriesEnum } from '../enums/products.enum';
import { ToolsCategoriesEnum } from '../enums/tools.enum';
import { Product } from './Product';

export class ProdutsCategories {
  id?: string;
  Products: Product[];
  type: ProductsCategoriesEnum;
  tools: ToolsCategoriesEnum;

  addProduct() {
    this.Products.push(new Product());
  }
}
