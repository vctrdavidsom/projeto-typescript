import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./models/Category";
import { Product } from "./models/Product";

export const AppDataSource = new DataSource({
    type: "sqlite", // Define que o banco será SQLite
    database: "database.sqlite", // Nome do arquivo do banco
    entities: [Category, Product], // Referencia diretamente as classes das entidades
    synchronize: true, // Cria e atualiza tabelas automaticamente (apenas para dev)
    logging: true, // Mostra as queries SQL no terminal
});
