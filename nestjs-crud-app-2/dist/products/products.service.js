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
        var _a;
        try {
            // Verifica se já existe um produto com o mesmo nome
            const existingProduct = await this.productRepository.findOne({
                where: { name: createProductDto.name }
            });
            if (existingProduct) {
                throw new common_1.ConflictException('Já existe um produto com este nome');
            }
            // Verifica se a categoria existe
            const category = await this.categoryRepository.findOneBy({
                id: createProductDto.categoryId
            });
            if (!category) {
                throw new common_1.NotFoundException('Categoria não encontrada');
            }
            // Verifica se a data de validade é válida
            if (createProductDto.expirationDate && createProductDto.expirationDate < new Date()) {
                throw new common_1.BadRequestException('Data de validade não pode ser no passado');
            }
            const product = this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { category, stockQuantity: createProductDto.stockQuantity || 0, isActive: (_a = createProductDto.isActive) !== null && _a !== void 0 ? _a : true }));
            return await this.productRepository.save(product);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao criar produto: ' + error.message);
        }
    }
    async findAll(options) {
        try {
            const queryBuilder = this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category');
            if (options === null || options === void 0 ? void 0 : options.categoryId) {
                queryBuilder.andWhere('category.id = :categoryId', { categoryId: options.categoryId });
            }
            if ((options === null || options === void 0 ? void 0 : options.isActive) !== undefined) {
                queryBuilder.andWhere('product.isActive = :isActive', { isActive: options.isActive });
            }
            if ((options === null || options === void 0 ? void 0 : options.minPrice) !== undefined) {
                queryBuilder.andWhere('product.price >= :minPrice', { minPrice: options.minPrice });
            }
            if ((options === null || options === void 0 ? void 0 : options.maxPrice) !== undefined) {
                queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: options.maxPrice });
            }
            if (options === null || options === void 0 ? void 0 : options.search) {
                queryBuilder.andWhere('(product.name LIKE :search OR product.description LIKE :search)', { search: `%${options.search}%` });
            }
            return await queryBuilder.getMany();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao buscar produtos: ' + error.message);
        }
    }
    async findOneByName(name) {
        try {
            const product = await this.productRepository.findOne({
                where: { name },
                relations: ['category']
            });
            if (!product) {
                throw new common_1.NotFoundException(`Produto com nome "${name}" não encontrado`);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao buscar produto: ' + error.message);
        }
    }
    async updateByName(name, updateProductDto) {
        try {
            const product = await this.findOneByName(name);
            if (updateProductDto.categoryId) {
                const category = await this.categoryRepository.findOneBy({
                    id: updateProductDto.categoryId
                });
                if (!category) {
                    throw new common_1.NotFoundException('Categoria não encontrada');
                }
                product.category = category;
            }
            if (updateProductDto.expirationDate && updateProductDto.expirationDate < new Date()) {
                throw new common_1.BadRequestException('Data de validade não pode ser no passado');
            }
            Object.assign(product, updateProductDto);
            return await this.productRepository.save(product);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar produto: ' + error.message);
        }
    }
    async removeByName(name) {
        try {
            const product = await this.findOneByName(name);
            const result = await this.productRepository.remove(product);
            return !!result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao remover produto: ' + error.message);
        }
    }
    async updateStock(name, quantity) {
        try {
            const product = await this.findOneByName(name);
            if (product.stockQuantity + quantity < 0) {
                throw new common_1.BadRequestException('Quantidade em estoque não pode ficar negativa');
            }
            product.stockQuantity += quantity;
            return await this.productRepository.save(product);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar estoque: ' + error.message);
        }
    }
    async updateRating(name, rating) {
        try {
            if (rating < 1 || rating > 5) {
                throw new common_1.BadRequestException('Avaliação deve estar entre 1 e 5');
            }
            const product = await this.findOneByName(name);
            const newRatingCount = product.ratingCount + 1;
            const newRating = ((product.rating * product.ratingCount) + rating) / newRatingCount;
            product.rating = newRating;
            product.ratingCount = newRatingCount;
            return await this.productRepository.save(product);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar avaliação: ' + error.message);
        }
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
