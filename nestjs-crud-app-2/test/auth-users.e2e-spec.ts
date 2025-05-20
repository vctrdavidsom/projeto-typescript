import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Usuario } from '../src/common/entities/usuario.entity';

describe('Users and Authentication (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: number;

  const testUser = {
    nome: 'Test User',
    email: 'test@example.com',
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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Users', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/usuarios')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nome).toBe(testUser.nome);
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).not.toHaveProperty('senha'); // Password should not be returned
          userId = res.body.id;
        });
    });

    it('should not create user with existing email', () => {
      return request(app.getHttpServer())
        .post('/usuarios')
        .send(testUser)
        .expect(409); // Conflict
    });

    it('should get user profile', () => {
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(userId);
          expect(res.body.nome).toBe(testUser.nome);
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).not.toHaveProperty('senha');
        });
    });

    it('should update user profile', () => {
      const updateData = {
        nome: 'Updated Test User',
        telefone: '11988888888',
      };

      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.nome).toBe(updateData.nome);
          expect(res.body.telefone).toBe(updateData.telefone);
        });
    });
  });

  describe('Authentication', () => {
    it('should authenticate user and return token', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          senha: testUser.senha,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          authToken = res.body.access_token;
        });
    });

    it('should not authenticate with wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          senha: 'wrongpassword',
        })
        .expect(401);
    });

    it('should get user profile with token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(testUser.email);
        });
    });

    it('should not get profile without token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });

    it('should not get profile with invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('Cleanup', () => {
    it('should delete user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });
}); 