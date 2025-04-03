import { AppDataSource } from "../data-source"; // Importa a conexão com o banco
import { CategoryService } from "../services/CategoryService";
import { ProductService } from "../services/ProductService";
import * as readlineSync from "readline-sync";

// Função para pausar a execução
function pause() {
    readlineSync.question("\nPressione ENTER para continuar...");
}

const categoryService = new CategoryService();
const productService = new ProductService();

async function mainMenu() {
    while (true) {
        console.clear();
        console.log("\n========================== Menu Principal ===========================");
        console.log("||        1. Gerenciar Categorias                                  ||");
        console.log("||        2. Gerenciar Produtos                                    ||");
        console.log("||        3. Sair                                                  ||");
        console.log("=====================================================================");
        const choice = readlineSync.question("Escolha uma opcao: ");

        switch (choice) {
            case "1":
                await categoryMenu();
                break;
            case "2":
                await productMenu();
                break;
            case "3":
                console.clear();
                console.log("Saindo...");
                pause();
                return;
            default:
                console.log("Opcao invalida!");
        }
    }
}

async function categoryMenu() {
    while (true) {
        console.clear();
        console.log("\n========================= Gerenciar Categorias =========================");
        console.log("||        1. Criar Categoria                                          ||");
        console.log("||        2. Listar Categorias                                        ||");
        console.log("||        3. Buscar Categoria                                         ||");
        console.log("||        4. Atualizar Categoria                                      ||");
        console.log("||        5. Remover Categoria                                        ||");
        console.log("||        6. Voltar                                                   ||");
        console.log("========================================================================");
        const choice = readlineSync.question("Escolha uma opcao: ");

        switch (choice) {
            case "1":
                console.clear();
                const nome = readlineSync.question("Nome da categoria: ");
                const descricao = readlineSync.question("Descricao da categoria: ");
                await categoryService.create(nome, descricao);
                console.clear();
                console.log("Categoria criada!");
                pause();
                break;
            case "2":
                console.clear();
                console.log("\nCategorias Cadastradas:", await categoryService.list());
                pause();
                break;
            case "3":
                console.clear();
                const idBusca = parseInt(readlineSync.question("ID da categoria: "));
                const categoriaBuscar = await categoryService.findById(idBusca);
                if (!categoriaBuscar) {
                    console.clear();
                    console.log("ID nao encontrado!");
                } else {
                    console.log(categoriaBuscar);
                }
                pause();
                break;
            case "4":
                console.clear();
                const idAtualiza = parseInt(readlineSync.question("ID da categoria a atualizar: "));
                const categoria = await categoryService.findById(idAtualiza);
                if (!categoria) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                const novoNome = readlineSync.question("Novo nome: ");
                const novaDescricao = readlineSync.question("Nova descricao: ");
                await categoryService.update(idAtualiza, novoNome, novaDescricao);
                console.clear();
                console.log("Categoria atualizada!");
                pause();
                break;
            case "5":
                console.clear();
                const idRemove = parseInt(readlineSync.question("ID da categoria a remover: "));
                if (await categoryService.delete(idRemove)) {
                    console.clear();
                    console.log("Categoria removida com sucesso.");
                } else {
                    console.clear();
                    console.log("Erro ao remover a categoria.");
                }
                pause();
                break;
            case "6":
                console.clear();
                return;
            default:
                console.clear();
                console.log("Opcao invalida!");
                pause();
        }
    }
}

async function productMenu() {
    while (true) {
        console.clear();
        console.log("\n========================= Gerenciar Produtos =========================");
        console.log("||        1. Criar Produto                                          ||");
        console.log("||        2. Listar Produtos                                        ||");
        console.log("||        3. Buscar Produto                                         ||");
        console.log("||        4. Atualizar Produto                                      ||");
        console.log("||        5. Remover Produto                                        ||");
        console.log("||        6. Voltar                                                 ||");
        console.log("======================================================================");
        const choice = readlineSync.question("Escolha uma opcao: ");

        switch (choice) {
            case "1":
                console.clear();
                const nomeProd = readlineSync.question("Nome do produto: ");
                const descricaoProd = readlineSync.question("Descricao do produto: ");
                const preco = parseFloat(readlineSync.question("Preco: "));
                const quantidade = parseInt(readlineSync.question("Quantidade: "));
                const categoriaId = parseInt(readlineSync.question("ID da categoria: "));
                await productService.create(nomeProd, descricaoProd, preco, quantidade, categoriaId);
                console.clear();
                console.log("Produto criado!");
                pause();
                break;
            case "2":
                console.clear();
                console.log("\nProdutos Cadastrados:", await productService.list());
                pause();
                break;
            case "3":
                console.clear();
                const idBusca = parseInt(readlineSync.question("ID do produto: "));
                const produtoBuscar = await productService.findById(idBusca);
                if (!produtoBuscar) {
                    console.clear();
                    console.log("ID nao encontrado!");
                } else {
                    console.log(produtoBuscar);
                }
                pause();
                break;
            case "4":
                console.clear();
                const idAtualiza = parseInt(readlineSync.question("ID do produto a atualizar: "));
                const produto = await productService.findById(idAtualiza);
                if (!produto) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                const novoNome = readlineSync.question("Novo nome: ");
                const novaDescricao = readlineSync.question("Nova descricao: ");
                const novoPreco = parseFloat(readlineSync.question("Novo preco: "));
                const novaQuantidade = parseInt(readlineSync.question("Nova quantidade: "));
                await productService.update(idAtualiza, novoNome, novaDescricao, novoPreco, novaQuantidade);
                console.clear();
                console.log("Produto atualizado!");
                pause();
                break;
            case "5":
                console.clear();
                const idRemove = parseInt(readlineSync.question("ID do produto a remover: "));
                if (await productService.delete(idRemove)) {
                    console.clear();
                    console.log("Produto removido com sucesso.");
                } else {
                    console.clear();
                    console.log("Erro ao remover o produto.");
                }
                pause();
                break;
            case "6":
                console.clear();
                return;
            default:
                console.clear();
                console.log("Opcao invalida!");
                pause();
        }
    }
}

if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
        .then(() => {
            console.log("📦 Banco de dados conectado!");
            mainMenu();
        })
        .catch((err) => {
            console.error("❌ Erro ao conectar ao banco:", err);
        });
} else {
    console.log("📦 Banco de dados já está inicializado.");
    mainMenu();
}
