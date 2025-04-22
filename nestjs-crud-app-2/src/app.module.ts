import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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