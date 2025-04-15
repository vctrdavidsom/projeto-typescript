export class CreateCategoryDto {
  name!: string;
  description?: string;
}

// filepath: /home/luan/Projects/nestjs-crud-app-2/src/products/dto/create-product.dto.ts
export class CreateProductDto {
  name!: string;
  description!: string;
  price!: number;
  categoryId!: number;
}