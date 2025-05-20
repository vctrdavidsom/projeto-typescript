"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const pedidos_module_1 = require("./pedidos/pedidos.module");
const entregas_module_1 = require("./entregas/entregas.module");
const enderecos_module_1 = require("./enderecos/enderecos.module");
const estabelecimentos_module_1 = require("./estabelecimentos/estabelecimentos.module");
const cupons_module_1 = require("./cupons/cupons.module");
const pagamentos_module_1 = require("./pagamentos/pagamentos.module");
const itens_pedido_module_1 = require("./itens-pedido/itens-pedido.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: (0, path_1.join)(__dirname, '..', 'database.sqlite'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            // Módulos de autenticação primeiro
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            // Demais módulos
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            usuarios_module_1.UsuariosModule,
            pedidos_module_1.PedidosModule,
            entregas_module_1.EntregasModule,
            enderecos_module_1.EnderecosModule,
            estabelecimentos_module_1.EstabelecimentosModule,
            cupons_module_1.CuponsModule,
            pagamentos_module_1.PagamentosModule,
            itens_pedido_module_1.ItensPedidoModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
