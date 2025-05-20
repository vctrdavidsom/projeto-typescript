import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Category } from '../src/common/entities/category.entity';
import { Product } from '../src/common/entities/product.entity';

describe('Products and Categories (e2e)', () => {
  let app: INestApplication;
  let categoryId: number;
  let productName: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Categories', () => {
    const testCategory = {
      name: 'Frutas Cítricas',
      description: 'Frutas ricas em vitamina C',
    };

    it('should create a new category', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .send(testCategory)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testCategory.name);
          expect(res.body.description).toBe(testCategory.description);
          categoryId = res.body.id;
        });
    });

    it('should get all categories', () => {
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
        });
    });

    it('should get category by name', () => {
      return request(app.getHttpServer())
        .get(`/categories/${testCategory.name}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(testCategory.name);
          expect(res.body.description).toBe(testCategory.description);
        });
    });

    it('should update category', () => {
      const updateData = {
        description: 'Frutas cítricas frescas e suculentas',
      };

      return request(app.getHttpServer())
        .put(`/categories/${testCategory.name}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.description).toBe(updateData.description);
        });
    });
  });

  describe('Products', () => {
    const testProduct = {
      name: 'Laranja Lima',
      description: 'Laranja doce e suculenta',
      price: 5.99,
      weight: 1.0,
      unit: 'kg',
      stockQuantity: 100,
      isActive: true,
      categoryId: 1, // Will be updated with actual categoryId
    };

    beforeAll(() => {
      testProduct.categoryId = categoryId;
    });

    it('should create a new product', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send(testProduct)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testProduct.name);
          expect(res.body.price).toBe(testProduct.price);
          expect(res.body.category.id).toBe(categoryId);
          productName = res.body.name;
        });
    });

    it('should get all products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('price');
        });
    });

    it('should get products with filters', () => {
      return request(app.getHttpServer())
        .get('/products')
        .query({
          categoryId: categoryId,
          isActive: true,
          minPrice: 5,
          maxPrice: 10,
        })
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach(product => {
            expect(product.category.id).toBe(categoryId);
            expect(product.isActive).toBe(true);
            expect(Number(product.price)).toBeGreaterThanOrEqual(5);
            expect(Number(product.price)).toBeLessThanOrEqual(10);
          });
        });
    });

    it('should get product by name', () => {
      return request(app.getHttpServer())
        .get(`/products/${productName}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(productName);
          expect(res.body.price).toBe(testProduct.price);
          expect(res.body.category.id).toBe(categoryId);
        });
    });

    it('should update product', () => {
      const updateData = {
        price: 6.99,
        description: 'Laranja lima premium',
      };

      return request(app.getHttpServer())
        .put(`/products/${productName}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.price).toBe(updateData.price);
          expect(res.body.description).toBe(updateData.description);
        });
    });

    it('should update product stock', () => {
      return request(app.getHttpServer())
        .put(`/products/${productName}/stock`)
        .send({ quantity: 150 })
        .expect(200)
        .expect((res) => {
          expect(res.body.stockQuantity).toBe(150);
        });
    });

    it('should update product rating', () => {
      return request(app.getHttpServer())
        .put(`/products/${productName}/rating`)
        .send({ rating: 4.5 })
        .expect(200)
        .expect((res) => {
          expect(res.body.rating).toBe(4.5);
          expect(res.body.ratingCount).toBe(1);
        });
    });

    it('should delete product', () => {
      return request(app.getHttpServer())
        .delete(`/products/${productName}`)
        .expect(204);
    });

    it('should delete category', () => {
      return request(app.getHttpServer())
        .delete(`/categories/${testCategory.name}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });
  });
}); 