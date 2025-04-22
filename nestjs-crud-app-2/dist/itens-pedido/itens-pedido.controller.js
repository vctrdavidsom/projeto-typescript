"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItensPedidoController = void 0;
const common_1 = require("@nestjs/common");
const itens_pedido_service_1 = require("./itens-pedido.service");
const item_pedido_entity_1 = require("../common/entities/item-pedido.entity");
let ItensPedidoController = class ItensPedidoController {
    constructor(itensPedidoService) {
        this.itensPedidoService = itensPedidoService;
    }
    create(itemPedido) {
        return this.itensPedidoService.create(itemPedido);
    }
    findAll() {
        return this.itensPedidoService.findAll();
    }
    findOne(id) {
        return this.itensPedidoService.findOne(id);
    }
    update(id, itemPedido) {
        return this.itensPedidoService.update(id, itemPedido);
    }
    remove(id) {
        return this.itensPedidoService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_pedido_entity_1.ItemPedido]),
    __metadata("design:returntype", Promise)
], ItensPedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItensPedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItensPedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ItensPedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItensPedidoController.prototype, "remove", null);
ItensPedidoController = __decorate([
    (0, common_1.Controller)('itens-pedido'),
    __metadata("design:paramtypes", [itens_pedido_service_1.ItensPedidoService])
], ItensPedidoController);
exports.ItensPedidoController = ItensPedidoController;
