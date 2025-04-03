import { CategoryService } from "../services/CategoryService";
import { ProductService } from "../services/ProductService";
import * as readlineSync from "readline-sync";

function pause() {
    readlineSync.question("\nPressione ENTER para continuar...");
}

const categoryService = new CategoryService();
const productService = new ProductService();

function mainMenu() {
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
                categoryMenu();
                break;
            case "2":
                productMenu();
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

function categoryMenu() {
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
                categoryService.create(nome, descricao);
                console.clear();
                console.log("Categoria criada!");
                pause();
                break;
            case "2":
                console.clear();
                console.log("\nCategorias Cadastradas:", categoryService.list());
                pause();
                break;
            case "3":
                console.clear();
                const idBusca = parseInt(readlineSync.question("ID da categoria: "));
                const categoriabuscar = categoryService.findById(idBusca);
                if (!categoriabuscar) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                console.log(categoryService.findById(idBusca));
                pause();
                break;
            
            case "4":
                console.clear();
                const idAtualiza = parseInt(readlineSync.question("ID da categoria a atualizar: "), 10);
                
                const categoria = categoryService.findById(idAtualiza);
                if (!categoria) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                
                const novoNome = readlineSync.question("Novo nome: ");
                const novaDescricao = readlineSync.question("Nova descricao: ");
                    
                if (categoryService.update(idAtualiza, novoNome, novaDescricao)) {
                    console.clear();
                    console.log("Categoria atualizada!");
                    pause();
                } else {
                    console.clear();
                    console.log("Falha ao atualizar a categoria.");
                    pause();
                }
                break;
                

                
            case "5":
                console.clear();
                const idRemove = parseInt(readlineSync.question("ID da categoria a remover: "));

                const categoriaRemover = categoryService.findById(idRemove);
                if (!categoriaRemover) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }

                if (!categoryService.remove(idRemove, productService)) {
                    console.clear();
                    console.log("Nao pode remover categoria com produtos associados.");
                    pause();
                } else {
                    console.clear();
                    console.log("Categoria removida com sucesso.");
                    pause();
                }
            
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

function productMenu() {
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
                productService.create(nomeProd, descricaoProd, preco, quantidade, categoriaId);
                console.clear();
                console.log("Produto criado!");
                pause();
                break;
            case "2":
                console.clear();
                console.log("\nProdutos Cadastrados:", productService.list());
                pause();
                break;
            case "3":
                console.clear();
                const idBusca = parseInt(readlineSync.question("ID do produto: "));
                const produtoBuscar = productService.findById(idBusca);
                if (!produtoBuscar) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                console.log(productService.findById(idBusca));
                pause();
                break;
            case "4":
                console.clear();
                const idAtualiza = parseInt(readlineSync.question("ID do produto a atualizar: "), 10);
                
                const produto = productService.findById(idAtualiza);
                if (!produto) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                
                const novoNome = readlineSync.question("Novo nome: ");
                const novaDescricao = readlineSync.question("Nova descricao: ");
                const novoPreco = parseFloat(readlineSync.question("Novo preco: "));
                const novaQuantidade = parseInt(readlineSync.question("Nova quantidade: "), 10);
                
                if (productService.update(idAtualiza, novoNome, novaDescricao, novoPreco, novaQuantidade)) {
                    console.clear();
                    console.log("Produto atualizado!");
                    pause();
                } else {
                    console.clear();
                    console.log("Falha ao atualizar o produto.");
                    pause();
                }
                break;
                
            case "5":
                console.clear();
                const idRemove = parseInt(readlineSync.question("ID do produto a remover: "), 10);
                
                const produtoRemover = productService.findById(idRemove);
                if (!produtoRemover) {
                    console.clear();
                    console.log("ID nao encontrado!");
                    pause();
                    break;
                }
                
                if (productService.remove(idRemove)) {
                    console.clear();
                    console.log("Produto removido com sucesso!");
                }else{
                    console.clear();
                    console.log("Falha ao remover o produto.");
                    pause();
                    }
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

mainMenu();
