import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    descricao!: string;

    @Column("decimal")
    preco!: number;

    @Column()
    quantidade!: number;

    @ManyToOne(() => Category, (category) => category.produtos, { onDelete: "CASCADE" })
    categoria!: Category;

    @CreateDateColumn()
    dataCriacao: Date = new Date();

    @UpdateDateColumn()
    dataAtualizacao: Date = new Date();
}

