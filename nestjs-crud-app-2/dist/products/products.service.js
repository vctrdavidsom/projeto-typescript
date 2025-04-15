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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../common/entities/product.entity"); // Corrigido
const category_entity_1 = require("../common/entities/category.entity"); // Adicionado
let ProductsService = class ProductsService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createProductDto) {
        const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId });
        if (!category)
            throw new Error('Category not found');
        const product = this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { category }));
        return this.productRepository.save(product);
    }
    findAll() {
        return this.productRepository.find({ relations: ['category'] });
    }
    findOneByName(name) {
        return this.productRepository.findOne({ where: { name }, relations: ['category'] });
    }
    async updateByName(name, updateProductDto) {
        const product = await this.findOneByName(name);
        if (!product)
            return null;
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }
    async removeByName(name) {
        const result = await this.productRepository.delete({ name });
        return result.affected ? result.affected > 0 : false;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
