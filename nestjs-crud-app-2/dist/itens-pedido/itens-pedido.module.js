"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItensPedidoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const itens_pedido_controller_1 = require("./itens-pedido.controller");
const itens_pedido_service_1 = require("./itens-pedido.service");
const item_pedido_entity_1 = require("../common/entities/item-pedido.entity");
let ItensPedidoModule = class ItensPedidoModule {
};
ItensPedidoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([item_pedido_entity_1.ItemPedido])],
        controllers: [itens_pedido_controller_1.ItensPedidoController],
        providers: [itens_pedido_service_1.ItensPedidoService],
    })
], ItensPedidoModule);
exports.ItensPedidoModule = ItensPedidoModule;
