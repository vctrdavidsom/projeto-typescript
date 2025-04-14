import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Product } from './common/entities/product.entity';
import { Category } from './common/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, Category],
      synchronize: true, // Apenas para desenvolvimento
    }),
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}