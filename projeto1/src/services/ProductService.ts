import { Product } from "../models/Product";

export class ProductService {
    private products: Product[] = [];
    private nextId = 1;

    create(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: number): Product {
        const product = new Product(this.nextId++, nome, descricao, preco, quantidade, categoriaId);
        this.products.push(product);
        return product;
    }

    list(): Product[] {
        return this.products;
    }

    findById(id: number): Product | undefined {
        return this.products.find(prod => prod.id === id);
    }

    findByName(nome: string): Product | undefined {
        return this.products.find(prod => prod.nome === nome);
    }

    findByCategory(categoriaId: number): Product[] {
        return this.products.filter(prod => prod.categoriaId === categoriaId);
    }

    update(id: number, nome?: string, descricao?: string, preco?: number, quantidade?: number): boolean {
        const product = this.findById(id);
        if (!product) return false;
        if (nome) product.nome = nome;
        if (descricao) product.descricao = descricao;
        if (preco !== undefined) product.preco = preco;
        if (quantidade !== undefined) product.quantidade = quantidade;
        product.dataAtualizacao = new Date();
        return true;
    }

    remove(id: number): boolean {
        const index = this.products.findIndex(prod => prod.id === id);
        if (index === -1) return false;
        this.products.splice(index, 1);
        return true;
    }

    hasProductsInCategory(categoriaId: number): boolean {
        return this.products.some(prod => prod.categoriaId === categoriaId);
    }

    
    
}

