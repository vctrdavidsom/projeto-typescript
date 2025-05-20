import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cupom } from '../src/common/entities/cupom.entity';
import { Estabelecimento } from '../src/common/entities/estabelecimento.entity';

describe('Coupons and Establishments (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: number;
  let couponId: number;
  let establishmentId: number;

  const testUser = {
    nome: 'Coupon Test User',
    email: 'coupon.test@example.com',
    senha: 'Test@123',
    telefone: '11999999999',
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
  });

  afterAll(async () => {
    // Cleanup
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    await app.close();
  });

  describe('Establishments', () => {
    const testEstablishment = {
      nome: 'Frutaria Teste',
      endereco: 'Rua das Frutas, 123 - São Paulo, SP',
      telefone: '11988888888',
    };

    it('should create a new establishment', () => {
      return request(app.getHttpServer())
        .post('/estabelecimentos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testEstablishment)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nome).toBe(testEstablishment.nome);
          expect(res.body.endereco).toBe(testEstablishment.endereco);
          expect(res.body.telefone).toBe(testEstablishment.telefone);
          establishmentId = res.body.id;
        });
    });

    it('should get all establishments', () => {
      return request(app.getHttpServer())
        .get('/estabelecimentos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('nome');
          expect(res.body[0]).toHaveProperty('endereco');
          expect(res.body[0]).toHaveProperty('telefone');
        });
    });

    it('should get establishment by id', () => {
      return request(app.getHttpServer())
        .get(`/estabelecimentos/${establishmentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(establishmentId);
          expect(res.body.nome).toBe(testEstablishment.nome);
          expect(res.body.endereco).toBe(testEstablishment.endereco);
        });
    });

    it('should update establishment', () => {
      const updateData = {
        telefone: '11977777777',
        endereco: 'Rua das Frutas, 456 - São Paulo, SP',
      };

      return request(app.getHttpServer())
        .put(`/estabelecimentos/${establishmentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.telefone).toBe(updateData.telefone);
          expect(res.body.endereco).toBe(updateData.endereco);
        });
    });
  });

  describe('Coupons', () => {
    const testCoupon = {
      codigo: 'FRUTA10',
      desconto: 10,
      validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    };

    it('should create a new coupon', () => {
      return request(app.getHttpServer())
        .post('/cupons')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testCoupon)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.codigo).toBe(testCoupon.codigo);
          expect(res.body.desconto).toBe(testCoupon.desconto);
          expect(res.body.validade).toBeDefined();
          couponId = res.body.id;
        });
    });

    it('should get all coupons', () => {
      return request(app.getHttpServer())
        .get('/cupons')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('codigo');
          expect(res.body[0]).toHaveProperty('desconto');
          expect(res.body[0]).toHaveProperty('validade');
        });
    });

    it('should get coupon by id', () => {
      return request(app.getHttpServer())
        .get(`/cupons/${couponId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(couponId);
          expect(res.body.codigo).toBe(testCoupon.codigo);
          expect(res.body.desconto).toBe(testCoupon.desconto);
        });
    });

    it('should update coupon', () => {
      const updateData = {
        desconto: 15,
        validade: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      };

      return request(app.getHttpServer())
        .put(`/cupons/${couponId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.desconto).toBe(updateData.desconto);
          expect(new Date(res.body.validade).getTime()).toBe(new Date(updateData.validade).getTime());
        });
    });

    it('should not create coupon with existing code', () => {
      return request(app.getHttpServer())
        .post('/cupons')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testCoupon)
        .expect(409); // Conflict
    });
  });

  describe('Cleanup', () => {
    it('should delete coupon', () => {
      return request(app.getHttpServer())
        .delete(`/cupons/${couponId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });

    it('should delete establishment', () => {
      return request(app.getHttpServer())
        .delete(`/estabelecimentos/${establishmentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true);
        });
    });
  });
}); 