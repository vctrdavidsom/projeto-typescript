import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { EntregasModule } from './entregas/entregas.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { EstabelecimentosModule } from './estabelecimentos/estabelecimentos.module';
import { CuponsModule } from './cupons/cupons.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { ItensPedidoModule } from './itens-pedido/itens-pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    // Módulos de autenticação primeiro
    AuthModule,
    UsersModule,
    // Demais módulos
    ProductsModule,
    CategoriesModule,
    UsuariosModule,
    PedidosModule,
    EntregasModule,
    EnderecosModule,
    EstabelecimentosModule,
    CuponsModule,
    PagamentosModule,
    ItensPedidoModule,
  ],
})
export class AppModule {}