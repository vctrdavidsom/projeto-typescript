import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Category } from "../models/Category";

export class CategoryRepository {
    private repo: Repository<Category>;

    constructor() {
        this.repo = AppDataSource.getRepository(Category);
    }

    async create(nome: string, descricao: string): Promise<Category> {
        const categoria = this.repo.create({ nome, descricao });
        return await this.repo.save(categoria);
    }

    async findAll(): Promise<Category[]> {
        return await this.repo.find();
    }

    async findById(id: number): Promise<Category | null> {
        return await this.repo.findOneBy({ id });
    }

    async findByName(nome: string): Promise<Category | null> {
        return await this.repo.findOneBy({ nome });
    }

    async update(id: number, nome: string, descricao: string): Promise<Category | null> {
        const categoria = await this.findById(id);
        if (!categoria) return null;

        categoria.nome = nome;
        categoria.descricao = descricao;
        return await this.repo.save(categoria);
    }

    async delete(id: number): Promise<boolean> {
        const categoria = await this.findById(id);
        if (!categoria) return false;

        await this.repo.remove(categoria);
        return true;
    }
}
