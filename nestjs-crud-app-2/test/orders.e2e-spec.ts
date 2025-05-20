import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Pedido } from '../src/common/entities/pedido.entity';
import { ItemPedido } from '../src/common/entities/item-pedido.entity';

describe('Orders and Order Items (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: number;
  let orderId: number;
  let productId: number;

  const testUser = {
    nome: 'Order Test User',
    email: 'order.test@example.com',
    senha: 'Test@123',
    telefone: '11999999999',
  };

  const testProduct = {
    name: 'Maçã Gala',
    description: 'Maçã doce e crocante',
    price: 4.99,
    weight: 1.0,
    unit: 'kg',
    stockQuantity: 100,
    isActive: true,
    categoryId: 1,
  };

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

    // Create test user and get auth token
    const userResponse = await request(app.getHttpServer())
      .post('/usuarios')
      .send(testUser);
    userId = userResponse.body.id;

    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        senha: testUser.senha,
      });
    authToken = authResponse.body.access_token;

    // Create test product
    const productResponse = await request(app.getHttpServer())
      .post('/products')
      .send(testProduct);
    productId = productResponse.body.id;
  });

  afterAll(async () => {
    // Cleanup
    await request(app.getHttpServer())
      .delete(`/products/${testProduct.name}`)
      .set('Authorization', `Bearer ${authToken}`);

    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    await app.close();
  });

  describe('Orders', () => {
    const testOrder = {
      status: 'PENDENTE',
      enderecoEntrega: 'Rua Teste, 123 - São Paulo, SP',
      itens: [
        {
          produtoId: 1, // Will be updated with actual productId
          quantidade: 2,
        },
      ],
    };

    beforeAll(() => {
      testOrder.itens[0].produtoId = productId;
    });

    it('should create a new order', () => {
      return request(app.getHttpServer())
        .post('/pedidos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testOrder)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.status).toBe(testOrder.status);
          expect(res.body.enderecoEntrega).toBe(testOrder.enderecoEntrega);
          expect(res.body.itens).toHaveLength(1);
          expect(res.body.itens[0].produtoId).toBe(productId);
          expect(res.body.itens[0].quantidade).toBe(2);
          orderId = res.body.id;
        });
    });

    it('should get all orders', () => {
      return request(app.getHttpServer())
        .get('/pedidos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('status');
          expect(res.body[0]).toHaveProperty('itens');
        });
    });

    it('should get order by id', () => {
      return request(app.getHttpServer())
        .get(`/pedidos/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(orderId);
          expect(res.body.status).toBe(testOrder.status);
          expect(res.body.itens).toHaveLength(1);
        });
    });

    it('should update order status', () => {
      const updateData = {
        status: 'EM_PREPARACAO',
      };

      return request(app.getHttpServer())
        .put(`/pedidos/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe(updateData.status);
        });
    });
  });

  describe('Order Items', () => {
    it('should get all order items', () => {
      return request(app.getHttpServer())
        .get('/itens-pedido')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('produtoId');
          expect(res.body[0]).toHaveProperty('quantidade');
        });
    });

    it('should get order items by order id', () => {
      return request(app.getHttpServer())
        .get(`/itens-pedido/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0].produtoId).toBe(productId);
        });
    });

    it('should update order item quantity', () => {
      const updateData = {
        quantidade: 3,
      };

      return request(app.getHttpServer())
        .put(`/itens-pedido/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.quantidade).toBe(updateData.quantidade);
        });
    });
  });

  describe('Order Completion', () => {
    it('should complete order', () => {
      const updateData = {
        status: 'ENTREGUE',
      };

      return request(app.getHttpServer())
        .put(`/pedidos/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe(updateData.status);
        });
    });

    it('should delete order', () => {
      return request(app.getHttpServer())
        .delete(`/pedidos/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });
  });
}); 