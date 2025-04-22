"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntregasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entregas_controller_1 = require("./entregas.controller");
const entregas_service_1 = require("./entregas.service");
const entrega_entity_1 = require("../common/entities/entrega.entity");
let EntregasModule = class EntregasModule {
};
EntregasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entrega_entity_1.Entrega])],
        controllers: [entregas_controller_1.EntregasController],
        providers: [entregas_service_1.EntregasService],
    })
], EntregasModule);
exports.EntregasModule = EntregasModule;
