import { Category } from "../models/Category";
import { ProductService } from "./ProductService";

export class CategoryService {
    private categories: Category[] = [];
    private nextId = 1;

    create(nome: string, descricao: string): Category {
        const category = new Category(this.nextId++, nome, descricao);
        this.categories.push(category);
        return category;
    }

    list(): Category[] {
        return this.categories;
    }

    findById(id: number): Category | undefined {
        return this.categories.find(cat => cat.id === id);
    }

    findByName(nome: string): Category | undefined {
        return this.categories.find(cat => cat.nome === nome);
    }

    update(id: number, nome?: string, descricao?: string): boolean {
        const category = this.findById(id);
        if (!category) return false;
        if (nome) category.nome = nome;
        if (descricao) category.descricao = descricao;
        return true;
    }

    remove(id: number, productService: ProductService): boolean {
        if (productService.hasProductsInCategory(id)) return false;
        this.categories = this.categories.filter(cat => cat.id !== id);
        return true;
    }
}