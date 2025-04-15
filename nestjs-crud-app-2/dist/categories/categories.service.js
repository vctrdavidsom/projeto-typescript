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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../common/entities/category.entity");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    create(createCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    findAll() {
        return this.categoryRepository.find();
    }
    findOne(id) {
        return this.categoryRepository.findOneBy({ id });
    }
    findOneByName(name) {
        return this.categoryRepository.findOneBy({ name });
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (!category)
            return null; // Ajustado para aceitar null
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    async updateByName(name, updateCategoryDto) {
        const category = await this.findOneByName(name);
        if (!category)
            return null; // Retorno ajustado para aceitar null
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        const result = await this.categoryRepository.delete(id);
        return result.affected ? result.affected > 0 : false; // Verificação ajustada
    }
    async removeByName(name) {
        const result = await this.categoryRepository.delete({ name });
        return result.affected ? result.affected > 0 : false; // Verificação ajustada
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
