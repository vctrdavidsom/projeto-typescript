import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number; // O "!" diz ao TypeScript que o valor será definido pelo TypeORM

    @Column({ unique: true })
    nome!: string;

    @Column()
    descricao!: string;

    @CreateDateColumn()
    dataCriacao!: Date;

    @OneToMany(() => Product, (product) => product.categoria)
    produtos!: Product[];
}

