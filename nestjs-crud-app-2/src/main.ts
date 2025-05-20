import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Delivery de Frutas')
    .setDescription('API para sistema de delivery de frutas')
    .setVersion('1.0')
    .addTag('products', 'Endpoints relacionados a produtos')
    .addTag('categories', 'Endpoints relacionados a categorias')
    .addTag('orders', 'Endpoints relacionados a pedidos')
    .addTag('deliveries', 'Endpoints relacionados a entregas')
    .addTag('users', 'Endpoints relacionados a usuários')
    .addTag('establishments', 'Endpoints relacionados a estabelecimentos')
    .addTag('coupons', 'Endpoints relacionados a cupons')
    .addTag('payments', 'Endpoints relacionados a pagamentos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuração de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(3000);
}
bootstrap();