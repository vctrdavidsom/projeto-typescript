import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

export class CategoryService {
    private categoryRepo: CategoryRepository;

    constructor() {
        this.categoryRepo = new CategoryRepository();
    }

    async create(nome: string, descricao: string): Promise<Category> {
        return await this.categoryRepo.create(nome, descricao);
    }

    async list(): Promise<Category[]> {
        return await this.categoryRepo.findAll();
    }

    async findById(id: number): Promise<Category | null> {
        return await this.categoryRepo.findById(id);
    }

    async update(id: number, nome: string, descricao: string): Promise<Category | null> {
        return await this.categoryRepo.update(id, nome, descricao);
    }

    async delete(id: number): Promise<boolean> {
        return await this.categoryRepo.delete(id);
    }
}
