import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";

export class ProductService {
    private productRepo: ProductRepository;

    constructor() {
        this.productRepo = new ProductRepository();
    }

    async create(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: number): Promise<Product> {
        return await this.productRepo.create(nome, descricao, preco, quantidade, categoriaId);
    }

    async list(): Promise<Product[]> {
        return await this.productRepo.findAll();
    }

    async findById(id: number): Promise<Product | null> {
        return await this.productRepo.findById(id);
    }

    async findByCategory(categoriaId: number): Promise<Product[]> {
        return await this.productRepo.findByCategory(categoriaId);
    }

    async update(id: number, nome: string, descricao: string, preco: number, quantidade: number): Promise<Product | null> {
        return await this.productRepo.update(id, nome, descricao, preco, quantidade);
    }

    async delete(id: number): Promise<boolean> {
        return await this.productRepo.delete(id);
    }
}
