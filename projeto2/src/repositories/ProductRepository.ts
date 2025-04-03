import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

export class ProductRepository {
    private repo: Repository<Product>;

    constructor() {
        this.repo = AppDataSource.getRepository(Product);
    }

    async create(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: number): Promise<Product> {
        const categoria = await AppDataSource.getRepository(Category).findOneBy({ id: categoriaId });
        if (!categoria) throw new Error("Categoria não encontrada");

        const produto = this.repo.create({ nome, descricao, preco, quantidade, categoria });
        return await this.repo.save(produto);
    }

    async findAll(): Promise<Product[]> {
        return await this.repo.find({ relations: ["categoria"] });
    }

    async findById(id: number): Promise<Product | null> {
        return await this.repo.findOne({ where: { id }, relations: ["categoria"] });
    }

    async findByCategory(categoriaId: number): Promise<Product[]> {
        return await this.repo.find({ where: { categoria: { id: categoriaId } }, relations: ["categoria"] });
    }

    async update(id: number, nome: string, descricao: string, preco: number, quantidade: number, categoriaId?: number): Promise<Product | null> {
        const produto = await this.findById(id);
        if (!produto) return null;

        if (categoriaId) {
            const categoria = await AppDataSource.getRepository(Category).findOneBy({ id: categoriaId });
            if (!categoria) throw new Error("Categoria não encontrada");
            produto.categoria = categoria;
        }

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.quantidade = quantidade;
        produto.dataAtualizacao = new Date();
        
        return await this.repo.save(produto);
    }

    async delete(id: number): Promise<boolean> {
        const produto = await this.findById(id);
        if (!produto) return false;

        await this.repo.remove(produto);
        return true;
    }
}
