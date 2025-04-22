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
exports.EstabelecimentosController = void 0;
const common_1 = require("@nestjs/common");
const estabelecimentos_service_1 = require("./estabelecimentos.service");
const estabelecimento_entity_1 = require("../common/entities/estabelecimento.entity");
let EstabelecimentosController = class EstabelecimentosController {
    constructor(estabelecimentosService) {
        this.estabelecimentosService = estabelecimentosService;
    }
    create(estabelecimento) {
        return this.estabelecimentosService.create(estabelecimento);
    }
    findAll() {
        return this.estabelecimentosService.findAll();
    }
    findOne(id) {
        return this.estabelecimentosService.findOne(id);
    }
    update(id, estabelecimento) {
        return this.estabelecimentosService.update(id, estabelecimento);
    }
    remove(id) {
        return this.estabelecimentosService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estabelecimento_entity_1.Estabelecimento]),
    __metadata("design:returntype", Promise)
], EstabelecimentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstabelecimentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstabelecimentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EstabelecimentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstabelecimentosController.prototype, "remove", null);
EstabelecimentosController = __decorate([
    (0, common_1.Controller)('estabelecimentos'),
    __metadata("design:paramtypes", [estabelecimentos_service_1.EstabelecimentosService])
], EstabelecimentosController);
exports.EstabelecimentosController = EstabelecimentosController;
