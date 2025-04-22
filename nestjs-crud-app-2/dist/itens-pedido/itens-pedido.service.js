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
exports.ItensPedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_pedido_entity_1 = require("../common/entities/item-pedido.entity");
let ItensPedidoService = class ItensPedidoService {
    constructor(itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
    }
    findAll() {
        return this.itemPedidoRepository.find();
    }
    findOne(id) {
        return this.itemPedidoRepository.findOneBy({ id });
    }
    create(itemPedido) {
        const newItemPedido = this.itemPedidoRepository.create(itemPedido);
        return this.itemPedidoRepository.save(newItemPedido);
    }
    async update(id, itemPedido) {
        const existingItemPedido = await this.findOne(id);
        if (!existingItemPedido)
            return null;
        Object.assign(existingItemPedido, itemPedido);
        return this.itemPedidoRepository.save(existingItemPedido);
    }
    async remove(id) {
        const result = await this.itemPedidoRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
};
ItensPedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_pedido_entity_1.ItemPedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItensPedidoService);
exports.ItensPedidoService = ItensPedidoService;
