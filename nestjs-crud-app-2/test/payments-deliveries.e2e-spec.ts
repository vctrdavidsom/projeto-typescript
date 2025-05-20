import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Pagamento } from '../src/common/entities/pagamento.entity';
import { Entrega } from '../src/common/entities/entrega.entity';

describe('Payments and Deliveries (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: number;
  let orderId: number;
  let paymentId: number;
  let deliveryId: number;

  const testUser = {
    nome: 'Payment Test User',
    email: 'payment.test@example.com',
    senha: 'Test@123',
    telefone: '11999999999',
  };

  const testOrder = {
    status: 'PENDENTE',
    enderecoEntrega: 'Rua Teste, 123 - São Paulo, SP',
    itens: [
      {
        produtoId: 1,
        quantidade: 2,
      },
    ],
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

    // Create test order
    const orderResponse = await request(app.getHttpServer())
      .post('/pedidos')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testOrder);
    orderId = orderResponse.body.id;
  });

  afterAll(async () => {
    // Cleanup
    await request(app.getHttpServer())
      .delete(`/pedidos/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`);

    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    await app.close();
  });

  describe('Payments', () => {
    const testPayment = {
      pedidoId: 1, // Will be updated with actual orderId
      valor: 29.98,
      status: 'PENDENTE',
    };

    beforeAll(() => {
      testPayment.pedidoId = orderId;
    });

    it('should create a new payment', () => {
      return request(app.getHttpServer())
        .post('/pagamentos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testPayment)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.pedidoId).toBe(orderId);
          expect(res.body.valor).toBe(testPayment.valor);
          expect(res.body.status).toBe(testPayment.status);
          paymentId = res.body.id;
        });
    });

    it('should get all payments', () => {
      return request(app.getHttpServer())
        .get('/pagamentos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('pedidoId');
          expect(res.body[0]).toHaveProperty('valor');
          expect(res.body[0]).toHaveProperty('status');
        });
    });

    it('should get payment by id', () => {
      return request(app.getHttpServer())
        .get(`/pagamentos/${paymentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(paymentId);
          expect(res.body.pedidoId).toBe(orderId);
          expect(res.body.valor).toBe(testPayment.valor);
        });
    });

    it('should update payment status', () => {
      const updateData = {
        status: 'APROVADO',
      };

      return request(app.getHttpServer())
        .put(`/pagamentos/${paymentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe(updateData.status);
        });
    });
  });

  describe('Deliveries', () => {
    const testDelivery = {
      pedidoId: 1, // Will be updated with actual orderId
      status: 'AGUARDANDO_COLETA',
      dataEntrega: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    };

    beforeAll(() => {
      testDelivery.pedidoId = orderId;
    });

    it('should create a new delivery', () => {
      return request(app.getHttpServer())
        .post('/entregas')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testDelivery)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.pedidoId).toBe(orderId);
          expect(res.body.status).toBe(testDelivery.status);
          expect(res.body.dataEntrega).toBeDefined();
          deliveryId = res.body.id;
        });
    });

    it('should get all deliveries', () => {
      return request(app.getHttpServer())
        .get('/entregas')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('pedidoId');
          expect(res.body[0]).toHaveProperty('status');
          expect(res.body[0]).toHaveProperty('dataEntrega');
        });
    });

    it('should get delivery by id', () => {
      return request(app.getHttpServer())
        .get(`/entregas/${deliveryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(deliveryId);
          expect(res.body.pedidoId).toBe(orderId);
          expect(res.body.status).toBe(testDelivery.status);
        });
    });

    it('should update delivery status', () => {
      const updateData = {
        status: 'EM_TRANSITO',
      };

      return request(app.getHttpServer())
        .put(`/entregas/${deliveryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe(updateData.status);
        });
    });

    it('should complete delivery', () => {
      const updateData = {
        status: 'ENTREGUE',
      };

      return request(app.getHttpServer())
        .put(`/entregas/${deliveryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe(updateData.status);
        });
    });
  });

  describe('Cleanup', () => {
    it('should delete delivery', () => {
      return request(app.getHttpServer())
        .delete(`/entregas/${deliveryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });

    it('should delete payment', () => {
      return request(app.getHttpServer())
        .delete(`/pagamentos/${paymentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });
  });
}); 