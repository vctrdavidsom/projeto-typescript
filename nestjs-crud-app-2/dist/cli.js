"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const axios_1 = __importDefault(require("axios"));
async function main() {
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Gerenciar Categorias',
                'Gerenciar Produtos',
                'Sair',
            ],
        },
    ]);
    if (action === 'Gerenciar Categorias') {
        await manageCategories();
        await main(); // Volta ao menu principal
    }
    else if (action === 'Gerenciar Produtos') {
        await manageProducts();
        await main(); // Volta ao menu principal
    }
    else {
        console.log('Saindo...');
        process.exit(0);
    }
}
async function manageCategories() {
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer com as categorias?',
            choices: [
                'Criar Categoria',
                'Listar Categorias',
                'Buscar Categoria',
                'Atualizar Categoria',
                'Remover Categoria',
                'Voltar',
            ],
        },
    ]);
    if (action === 'Voltar') {
        return; // Retorna ao menu principal
    }
    if (action === 'Criar Categoria') {
        const { name, description } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome da categoria:' },
            { type: 'input', name: 'description', message: 'Descrição da categoria:' },
        ]);
        await axios_1.default.post('http://localhost:3000/categories', { name, description });
        console.log('Categoria criada com sucesso!');
    }
    else if (action === 'Listar Categorias') {
        const response = await axios_1.default.get('http://localhost:3000/categories');
        console.log('Categorias:', response.data);
    }
    else if (action === 'Buscar Categoria') {
        const { name } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome da categoria:' },
        ]);
        const response = await axios_1.default.get(`http://localhost:3000/categories/${name}`);
        console.log('Categoria:', response.data);
    }
    else if (action === 'Atualizar Categoria') {
        const { name, newName, description } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome da categoria a ser atualizada:' },
            { type: 'input', name: 'newName', message: 'Novo nome da categoria:' },
            { type: 'input', name: 'description', message: 'Nova descrição da categoria:' },
        ]);
        await axios_1.default.put(`http://localhost:3000/categories/${name}`, { name: newName, description });
        console.log('Categoria atualizada com sucesso!');
    }
    else if (action === 'Remover Categoria') {
        const { name } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome da categoria a ser removida:' },
        ]);
        await axios_1.default.delete(`http://localhost:3000/categories/${name}`);
        console.log('Categoria removida com sucesso!');
    }
    await manageCategories(); // Continua no menu de categorias
}
async function manageProducts() {
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer com os produtos?',
            choices: [
                'Criar Produto',
                'Listar Produtos',
                'Buscar Produto',
                'Atualizar Produto',
                'Remover Produto',
                'Voltar',
            ],
        },
    ]);
    if (action === 'Voltar') {
        return; // Retorna ao menu principal
    }
    if (action === 'Criar Produto') {
        const { name, description, price, categoryId } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome do produto:' },
            { type: 'input', name: 'description', message: 'Descrição do produto:' },
            { type: 'number', name: 'price', message: 'Preço do produto:' },
            { type: 'number', name: 'categoryId', message: 'ID da categoria:' },
        ]);
        await axios_1.default.post('http://localhost:3000/products', { name, description, price, categoryId });
        console.log('Produto criado com sucesso!');
    }
    else if (action === 'Listar Produtos') {
        const response = await axios_1.default.get('http://localhost:3000/products');
        console.log('Produtos:', response.data);
    }
    else if (action === 'Buscar Produto') {
        const { name } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome do produto:' },
        ]);
        const response = await axios_1.default.get(`http://localhost:3000/products/${name}`);
        console.log('Produto:', response.data);
    }
    else if (action === 'Atualizar Produto') {
        const { name, newName, description, price, categoryId } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome do produto a ser atualizado:' },
            { type: 'input', name: 'newName', message: 'Novo nome do produto:' },
            { type: 'input', name: 'description', message: 'Nova descrição do produto:' },
            { type: 'number', name: 'price', message: 'Novo preço do produto:' },
            { type: 'number', name: 'categoryId', message: 'Novo ID da categoria:' },
        ]);
        await axios_1.default.put(`http://localhost:3000/products/${name}`, { name: newName, description, price, categoryId });
        console.log('Produto atualizado com sucesso!');
    }
    else if (action === 'Remover Produto') {
        const { name } = await inquirer_1.default.prompt([
            { type: 'input', name: 'name', message: 'Nome do produto a ser removido:' },
        ]);
        await axios_1.default.delete(`http://localhost:3000/products/${name}`);
        console.log('Produto removido com sucesso!');
    }
    await manageProducts(); // Continua no menu de produtos
}
main();
