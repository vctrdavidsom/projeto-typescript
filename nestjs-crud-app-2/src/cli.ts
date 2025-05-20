import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
import open from 'open';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const API_URL = 'http://localhost:3000';

let authToken: string | null = null;

interface TokenResponse {
  token: string;
}

async function checkAuth() {
  if (!authToken) {
    console.log(chalk.yellow('Você precisa fazer login primeiro!'));
    await login();
  }
  return authToken;
}

async function login() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Como você deseja fazer login?',
      choices: ['Login com Google', 'Voltar'],
    },
  ]);

  if (action === 'Voltar') {
    return;
  }

  try {
    // Abre o navegador para autenticação com Google
    console.log(chalk.blue('Abrindo navegador para autenticação...'));
    await open(`${API_URL}/auth/google`);

    // Aguarda o usuário completar o login
    console.log(chalk.yellow('Por favor, complete o login no navegador...'));
    
    // Inicia um servidor temporário para capturar o token
    const { stdout } = await execAsync('npx http-server -p 3001 --cors');
    console.log(chalk.green('Servidor temporário iniciado em http://localhost:3001'));

    // Aguarda o token ser recebido
    const token = await new Promise<string>((resolve) => {
      const checkToken = async () => {
        try {
          const response = await axios.get<TokenResponse>('http://localhost:3001/token');
          if (response.data.token) {
            resolve(response.data.token);
          }
        } catch (error) {
          setTimeout(checkToken, 1000);
        }
      };
      checkToken();
    });

    authToken = token;
    console.log(chalk.green('Login realizado com sucesso!'));

    // Mata o servidor temporário
    await execAsync('taskkill /F /IM node.exe');
  } catch (error) {
    console.error(chalk.red('Erro durante o login:'), error);
  }
}

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [
        'Login',
        'Gerenciar Categorias',
        'Gerenciar Produtos',
        'Gerenciar Pedidos',
        'Gerenciar Entregas',
        'Gerenciar Usuários',
        'Gerenciar Estabelecimentos',
        'Gerenciar Cupons',
        'Gerenciar Pagamentos',
        'Sair',
      ],
    },
  ]);

  switch (action) {
    case 'Login':
      await login();
      break;
    case 'Gerenciar Categorias':
      await checkAuth() && manageCategories();
      break;
    case 'Gerenciar Produtos':
      await checkAuth() && manageProducts();
      break;
    case 'Gerenciar Pedidos':
      await checkAuth() && managePedidos();
      break;
    case 'Gerenciar Entregas':
      await checkAuth() && manageEntregas();
      break;
    case 'Gerenciar Usuários':
      await checkAuth() && manageUsuarios();
      break;
    case 'Gerenciar Estabelecimentos':
      await checkAuth() && manageEstabelecimentos();
      break;
    case 'Gerenciar Cupons':
      await checkAuth() && manageCupons();
      break;
    case 'Gerenciar Pagamentos':
      await checkAuth() && managePagamentos();
      break;
    case 'Sair':
      console.log(chalk.yellow('Saindo...'));
      process.exit(0);
  }

  await main();
}

async function manageProducts(): Promise<void> {
  const { action } = await inquirer.prompt([
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
        'Atualizar Estoque',
        'Avaliar Produto',
        'Filtrar Produtos',
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') {
    return;
  }

  try {
    switch (action) {
      case 'Criar Produto':
        const createData = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto:' },
          { type: 'input', name: 'description', message: 'Descrição do produto:' },
          { type: 'number', name: 'price', message: 'Preço do produto:' },
          { type: 'number', name: 'categoryId', message: 'ID da categoria:' },
          { type: 'number', name: 'weight', message: 'Peso (opcional):' },
          { 
            type: 'list', 
            name: 'unit', 
            message: 'Unidade de medida:',
            choices: ['kg', 'unidade', 'caixa', 'dúzia'],
            when: (answers) => answers.weight !== undefined
          },
          { 
            type: 'input', 
            name: 'expirationDate', 
            message: 'Data de validade (YYYY-MM-DD):',
            validate: (input) => {
              const date = new Date(input);
              return !isNaN(date.getTime()) || 'Data inválida';
            }
          },
          { type: 'number', name: 'stockQuantity', message: 'Quantidade em estoque:' },
          { type: 'input', name: 'imageUrl', message: 'URL da imagem (opcional):' },
          { 
            type: 'list', 
            name: 'seasonality', 
            message: 'Sazonalidade:',
            choices: ['Verão', 'Inverno', 'Primavera', 'Outono', 'Ano todo']
          }
        ]);

        const response = await makeAuthenticatedRequest('POST', '/products', createData);
        console.log(chalk.green('Produto criado com sucesso!'));
        console.log(response);
        break;

      case 'Listar Produtos':
        const listResponse = await makeAuthenticatedRequest('GET', '/products');
        console.log(chalk.blue('Lista de Produtos:'));
        console.table(listResponse);
        break;

      case 'Buscar Produto':
        const { name } = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto:' }
        ]);
        const searchResponse = await makeAuthenticatedRequest('GET', `/products/${name}`);
        console.log(chalk.blue('Produto encontrado:'));
        console.log(searchResponse);
        break;

      case 'Atualizar Produto':
        const updateData = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto a atualizar:' },
          { type: 'input', name: 'newName', message: 'Novo nome (opcional):' },
          { type: 'input', name: 'description', message: 'Nova descrição (opcional):' },
          { type: 'number', name: 'price', message: 'Novo preço (opcional):' },
          { type: 'number', name: 'categoryId', message: 'Novo ID da categoria (opcional):' },
          { type: 'number', name: 'weight', message: 'Novo peso (opcional):' },
          { 
            type: 'list', 
            name: 'unit', 
            message: 'Nova unidade de medida:',
            choices: ['kg', 'unidade', 'caixa', 'dúzia'],
            when: (answers) => answers.weight !== undefined
          },
          { 
            type: 'input', 
            name: 'expirationDate', 
            message: 'Nova data de validade (YYYY-MM-DD):',
            validate: (input) => {
              if (!input) return true;
              const date = new Date(input);
              return !isNaN(date.getTime()) || 'Data inválida';
            }
          },
          { type: 'number', name: 'stockQuantity', message: 'Nova quantidade em estoque (opcional):' },
          { type: 'input', name: 'imageUrl', message: 'Nova URL da imagem (opcional):' },
          { 
            type: 'list', 
            name: 'seasonality', 
            message: 'Nova sazonalidade:',
            choices: ['Verão', 'Inverno', 'Primavera', 'Outono', 'Ano todo']
          }
        ]);

        const { name: productName, ...updateFields } = updateData;
        const updateResponse = await makeAuthenticatedRequest('PUT', `/products/${productName}`, updateFields);
        console.log(chalk.green('Produto atualizado com sucesso!'));
        console.log(updateResponse);
        break;

      case 'Remover Produto':
        const { name: deleteName } = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto a remover:' }
        ]);
        await makeAuthenticatedRequest('DELETE', `/products/${deleteName}`);
        console.log(chalk.green('Produto removido com sucesso!'));
        break;

      case 'Atualizar Estoque':
        const stockData = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto:' },
          { 
            type: 'number', 
            name: 'quantity', 
            message: 'Quantidade a adicionar (use número negativo para remover):'
          }
        ]);
        const stockResponse = await makeAuthenticatedRequest('PUT', `/products/${stockData.name}/stock`, { quantity: stockData.quantity });
        console.log(chalk.green('Estoque atualizado com sucesso!'));
        console.log(stockResponse);
        break;

      case 'Avaliar Produto':
        const ratingData = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nome do produto:' },
          { 
            type: 'number', 
            name: 'rating', 
            message: 'Avaliação (1-5):',
            validate: (input) => input >= 1 && input <= 5 || 'Avaliação deve estar entre 1 e 5'
          }
        ]);
        const ratingResponse = await makeAuthenticatedRequest('PUT', `/products/${ratingData.name}/rating`, { rating: ratingData.rating });
        console.log(chalk.green('Avaliação registrada com sucesso!'));
        console.log(ratingResponse);
        break;

      case 'Filtrar Produtos':
        const filterData = await inquirer.prompt([
          { type: 'number', name: 'categoryId', message: 'ID da categoria (opcional):' },
          { 
            type: 'confirm', 
            name: 'isActive', 
            message: 'Mostrar apenas produtos ativos?',
            default: true
          },
          { type: 'number', name: 'minPrice', message: 'Preço mínimo (opcional):' },
          { type: 'number', name: 'maxPrice', message: 'Preço máximo (opcional):' },
          { type: 'input', name: 'search', message: 'Termo de busca (opcional):' }
        ]);

        const queryParams = new URLSearchParams();
        Object.entries(filterData).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            queryParams.append(key, String(value));
          }
        });

        const filterResponse = await makeAuthenticatedRequest('GET', `/products?${queryParams.toString()}`);
        console.log(chalk.blue('Produtos filtrados:'));
        console.table(filterResponse);
        break;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = (error as any).response?.data?.message || error.message;
      console.error(chalk.red('Erro:'), errorMessage);
    } else {
      console.error(chalk.red('Erro inesperado:'), error);
    }
  }

  await manageProducts();
}

async function manageCategories() {
  const { action } = await inquirer.prompt([
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
    const { name, description } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria:' },
      { type: 'input', name: 'description', message: 'Descrição da categoria:' },
    ]);
    await makeAuthenticatedRequest('POST', '/categories', { name, description });
    console.log('Categoria criada com sucesso!');
  } else if (action === 'Listar Categorias') {
    const response = await makeAuthenticatedRequest('GET', '/categories');
    console.log('Categorias:', response);
  } else if (action === 'Buscar Categoria') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria:' },
    ]);
    const response = await makeAuthenticatedRequest('GET', `/categories/${name}`);
    console.log('Categoria:', response);
  } else if (action === 'Atualizar Categoria') {
    const { name, newName, description } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria a ser atualizada:' },
      { type: 'input', name: 'newName', message: 'Novo nome da categoria:' },
      { type: 'input', name: 'description', message: 'Nova descrição da categoria:' },
    ]);
    await makeAuthenticatedRequest('PUT', `/categories/${name}`, { name: newName, description });
    console.log('Categoria atualizada com sucesso!');
  } else if (action === 'Remover Categoria') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria a ser removida:' },
    ]);
    await makeAuthenticatedRequest('DELETE', `/categories/${name}`);
    console.log('Categoria removida com sucesso!');
  }

  await manageCategories(); // Continua no menu de categorias
}

async function managePedidos() {
  // TODO: Implementar gerenciamento de pedidos
  console.log('Gerenciamento de pedidos em desenvolvimento...');
}

async function manageEntregas() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer com as entregas?',
      choices: [
        'Criar Entrega',
        'Listar Entregas',
        'Buscar Entrega',
        'Atualizar Entrega',
        'Remover Entrega',
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') return;

  if (action === 'Criar Entrega') {
    const { pedidoId, status, dataEntrega } = await inquirer.prompt([
      { type: 'number', name: 'pedidoId', message: 'ID do pedido:' },
      { type: 'input', name: 'status', message: 'Status da entrega:' },
      { type: 'input', name: 'dataEntrega', message: 'Data de entrega (YYYY-MM-DD):' },
    ]);
    await makeAuthenticatedRequest('POST', '/entregas', { pedidoId, status, dataEntrega });
    console.log('Entrega criada com sucesso!');
  } else if (action === 'Listar Entregas') {
    const response = await makeAuthenticatedRequest('GET', '/entregas');
    console.log('Entregas:', response);
  } else if (action === 'Buscar Entrega') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID da entrega:' }]);
    const response = await makeAuthenticatedRequest('GET', `/entregas/${id}`);
    console.log('Entrega:', response);
  } else if (action === 'Atualizar Entrega') {
    const { id, status } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID da entrega:' },
      { type: 'input', name: 'status', message: 'Novo status da entrega:' },
    ]);
    await makeAuthenticatedRequest('PUT', `/entregas/${id}`, { status });
    console.log('Entrega atualizada com sucesso!');
  } else if (action === 'Remover Entrega') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID da entrega:' }]);
    await makeAuthenticatedRequest('DELETE', `/entregas/${id}`);
    console.log('Entrega removida com sucesso!');
  }

  await manageEntregas(); // Retorna ao menu de entregas
}

async function manageUsuarios() {
  // TODO: Implementar gerenciamento de usuários
  console.log('Gerenciamento de usuários em desenvolvimento...');
}

async function manageEstabelecimentos() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer com os estabelecimentos?',
      choices: [
        'Criar Estabelecimento',
        'Listar Estabelecimentos',
        'Buscar Estabelecimento',
        'Atualizar Estabelecimento',
        'Remover Estabelecimento',
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') return;

  if (action === 'Criar Estabelecimento') {
    const { nome, endereco, telefone } = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome do estabelecimento:' },
      { type: 'input', name: 'endereco', message: 'Endereço do estabelecimento:' },
      { type: 'input', name: 'telefone', message: 'Telefone do estabelecimento:' },
    ]);
    await makeAuthenticatedRequest('POST', '/estabelecimentos', { nome, endereco, telefone });
    console.log('Estabelecimento criado com sucesso!');
  } else if (action === 'Listar Estabelecimentos') {
    const response = await makeAuthenticatedRequest('GET', '/estabelecimentos');
    console.log('Estabelecimentos:', response);
  } else if (action === 'Buscar Estabelecimento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do estabelecimento:' }]);
    const response = await makeAuthenticatedRequest('GET', `/estabelecimentos/${id}`);
    console.log('Estabelecimento:', response);
  } else if (action === 'Atualizar Estabelecimento') {
    const { id, nome } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID do estabelecimento:' },
      { type: 'input', name: 'nome', message: 'Novo nome do estabelecimento:' },
    ]);
    await makeAuthenticatedRequest('PUT', `/estabelecimentos/${id}`, { nome });
    console.log('Estabelecimento atualizado com sucesso!');
  } else if (action === 'Remover Estabelecimento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do estabelecimento:' }]);
    await makeAuthenticatedRequest('DELETE', `/estabelecimentos/${id}`);
    console.log('Estabelecimento removido com sucesso!');
  }

  await manageEstabelecimentos(); // Retorna ao menu de estabelecimentos
}

async function manageCupons() {
  // TODO: Implementar gerenciamento de cupons
  console.log('Gerenciamento de cupons em desenvolvimento...');
}

async function managePagamentos() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer com os pagamentos?',
      choices: [
        'Criar Pagamento',
        'Listar Pagamentos',
        'Buscar Pagamento',
        'Atualizar Pagamento',
        'Remover Pagamento',
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') return;

  if (action === 'Criar Pagamento') {
    const { pedidoId, valor, status } = await inquirer.prompt([
      { type: 'number', name: 'pedidoId', message: 'ID do pedido:' },
      { type: 'number', name: 'valor', message: 'Valor do pagamento:' },
      { type: 'input', name: 'status', message: 'Status do pagamento:' },
    ]);
    await makeAuthenticatedRequest('POST', '/pagamentos', { pedidoId, valor, status });
    console.log('Pagamento criado com sucesso!');
  } else if (action === 'Listar Pagamentos') {
    const response = await makeAuthenticatedRequest('GET', '/pagamentos');
    console.log('Pagamentos:', response);
  } else if (action === 'Buscar Pagamento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do pagamento:' }]);
    const response = await makeAuthenticatedRequest('GET', `/pagamentos/${id}`);
    console.log('Pagamento:', response);
  } else if (action === 'Atualizar Pagamento') {
    const { id, status } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID do pagamento:' },
      { type: 'input', name: 'status', message: 'Novo status do pagamento:' },
    ]);
    await makeAuthenticatedRequest('PUT', `/pagamentos/${id}`, { status });
    console.log('Pagamento atualizado com sucesso!');
  } else if (action === 'Remover Pagamento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do pagamento:' }]);
    await makeAuthenticatedRequest('DELETE', `/pagamentos/${id}`);
    console.log('Pagamento removido com sucesso!');
  }

  await managePagamentos(); // Retorna ao menu de pagamentos
}

async function makeAuthenticatedRequest<T>(method: string, url: string, data?: any): Promise<T> {
  const token = await checkAuth();
  if (!token) {
    throw new Error('Não autenticado');
  }
  try {
    const response = await axios<T>({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = (error as any).response?.data?.message || error.message;
      console.error(chalk.red('Erro:'), errorMessage);
    } else {
      console.error(chalk.red('Erro inesperado:'), error);
    }
    throw error;
  }
}

main().catch(console.error);