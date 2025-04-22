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
exports.EntregasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entrega_entity_1 = require("../common/entities/entrega.entity");
let EntregasService = class EntregasService {
    constructor(entregaRepository) {
        this.entregaRepository = entregaRepository;
    }
    findAll() {
        return this.entregaRepository.find();
    }
    findOne(id) {
        return this.entregaRepository.findOneBy({ id });
    }
    create(entrega) {
        const newEntrega = this.entregaRepository.create(entrega);
        return this.entregaRepository.save(newEntrega);
    }
    async update(id, entrega) {
        const existingEntrega = await this.findOne(id);
        if (!existingEntrega)
            return null;
        Object.assign(existingEntrega, entrega);
        return this.entregaRepository.save(existingEntrega);
    }
    async remove(id) {
        const result = await this.entregaRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
};
EntregasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entrega_entity_1.Entrega)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EntregasService);
exports.EntregasService = EntregasService;
