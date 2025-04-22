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
exports.EnderecosController = void 0;
const common_1 = require("@nestjs/common");
const enderecos_service_1 = require("./enderecos.service");
const endereco_entity_1 = require("../common/entities/endereco.entity");
let EnderecosController = class EnderecosController {
    constructor(enderecosService) {
        this.enderecosService = enderecosService;
    }
    create(endereco) {
        return this.enderecosService.create(endereco);
    }
    findAll() {
        return this.enderecosService.findAll();
    }
    findOne(id) {
        return this.enderecosService.findOne(id);
    }
    update(id, endereco) {
        return this.enderecosService.update(id, endereco);
    }
    remove(id) {
        return this.enderecosService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endereco_entity_1.Endereco]),
    __metadata("design:returntype", Promise)
], EnderecosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnderecosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnderecosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EnderecosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnderecosController.prototype, "remove", null);
EnderecosController = __decorate([
    (0, common_1.Controller)('enderecos'),
    __metadata("design:paramtypes", [enderecos_service_1.EnderecosService])
], EnderecosController);
exports.EnderecosController = EnderecosController;
