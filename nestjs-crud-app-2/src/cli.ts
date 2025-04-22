import inquirer from 'inquirer';
import axios from 'axios';

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [
        'Gerenciar Categorias',
        'Gerenciar Produtos',
        'Gerenciar Entregas',
        'Gerenciar Pagamentos',
        'Gerenciar Estabelecimentos',
        'Gerenciar Itens do Pedido',
        'Sair',
      ],
    },
  ]);

  switch (action) {
    case 'Gerenciar Categorias':
      await manageCategories();
      break;
    case 'Gerenciar Produtos':
      await manageProducts();
      break;
    case 'Gerenciar Entregas':
      await manageEntregas();
      break;
    case 'Gerenciar Pagamentos':
      await managePagamentos();
      break;
    case 'Gerenciar Estabelecimentos':
      await manageEstabelecimentos();
      break;
    case 'Gerenciar Itens do Pedido':
      await manageItensPedido();
      break;
    case 'Sair':
      console.log('Saindo...');
      process.exit(0);
  }

  await main(); // Retorna ao menu principal
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
    await axios.post('http://localhost:3000/categories', { name, description });
    console.log('Categoria criada com sucesso!');
  } else if (action === 'Listar Categorias') {
    const response = await axios.get('http://localhost:3000/categories');
    console.log('Categorias:', response.data);
  } else if (action === 'Buscar Categoria') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria:' },
    ]);
    const response = await axios.get(`http://localhost:3000/categories/${name}`);
    console.log('Categoria:', response.data);
  } else if (action === 'Atualizar Categoria') {
    const { name, newName, description } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria a ser atualizada:' },
      { type: 'input', name: 'newName', message: 'Novo nome da categoria:' },
      { type: 'input', name: 'description', message: 'Nova descrição da categoria:' },
    ]);
    await axios.put(`http://localhost:3000/categories/${name}`, { name: newName, description });
    console.log('Categoria atualizada com sucesso!');
  } else if (action === 'Remover Categoria') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome da categoria a ser removida:' },
    ]);
    await axios.delete(`http://localhost:3000/categories/${name}`);
    console.log('Categoria removida com sucesso!');
  }

  await manageCategories(); // Continua no menu de categorias
}

async function manageProducts() {
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
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') {
    return; // Retorna ao menu principal
  }

  if (action === 'Criar Produto') {
    const { name, description, price, categoryId } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome do produto:' },
      { type: 'input', name: 'description', message: 'Descrição do produto:' },
      { type: 'number', name: 'price', message: 'Preço do produto:' },
      { type: 'number', name: 'categoryId', message: 'ID da categoria:' },
    ]);
    await axios.post('http://localhost:3000/products', { name, description, price, categoryId });
    console.log('Produto criado com sucesso!');
  } else if (action === 'Listar Produtos') {
    const response = await axios.get('http://localhost:3000/products');
    console.log('Produtos:', response.data);
  } else if (action === 'Buscar Produto') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome do produto:' },
    ]);
    const response = await axios.get(`http://localhost:3000/products/${name}`);
    console.log('Produto:', response.data);
  } else if (action === 'Atualizar Produto') {
    const { name, newName, description, price, categoryId } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome do produto a ser atualizado:' },
      { type: 'input', name: 'newName', message: 'Novo nome do produto:' },
      { type: 'input', name: 'description', message: 'Nova descrição do produto:' },
      { type: 'number', name: 'price', message: 'Novo preço do produto:' },
      { type: 'number', name: 'categoryId', message: 'Novo ID da categoria:' },
    ]);
    await axios.put(`http://localhost:3000/products/${name}`, { name: newName, description, price, categoryId });
    console.log('Produto atualizado com sucesso!');
  } else if (action === 'Remover Produto') {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nome do produto a ser removido:' },
    ]);
    await axios.delete(`http://localhost:3000/products/${name}`);
    console.log('Produto removido com sucesso!');
  }

  await manageProducts(); // Continua no menu de produtos
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
    await axios.post('http://localhost:3000/entregas', { pedidoId, status, dataEntrega });
    console.log('Entrega criada com sucesso!');
  } else if (action === 'Listar Entregas') {
    const response = await axios.get('http://localhost:3000/entregas');
    console.log('Entregas:', response.data);
  } else if (action === 'Buscar Entrega') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID da entrega:' }]);
    const response = await axios.get(`http://localhost:3000/entregas/${id}`);
    console.log('Entrega:', response.data);
  } else if (action === 'Atualizar Entrega') {
    const { id, status } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID da entrega:' },
      { type: 'input', name: 'status', message: 'Novo status da entrega:' },
    ]);
    await axios.put(`http://localhost:3000/entregas/${id}`, { status });
    console.log('Entrega atualizada com sucesso!');
  } else if (action === 'Remover Entrega') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID da entrega:' }]);
    await axios.delete(`http://localhost:3000/entregas/${id}`);
    console.log('Entrega removida com sucesso!');
  }

  await manageEntregas(); // Retorna ao menu de entregas
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
    await axios.post('http://localhost:3000/pagamentos', { pedidoId, valor, status });
    console.log('Pagamento criado com sucesso!');
  } else if (action === 'Listar Pagamentos') {
    const response = await axios.get('http://localhost:3000/pagamentos');
    console.log('Pagamentos:', response.data);
  } else if (action === 'Buscar Pagamento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do pagamento:' }]);
    const response = await axios.get(`http://localhost:3000/pagamentos/${id}`);
    console.log('Pagamento:', response.data);
  } else if (action === 'Atualizar Pagamento') {
    const { id, status } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID do pagamento:' },
      { type: 'input', name: 'status', message: 'Novo status do pagamento:' },
    ]);
    await axios.put(`http://localhost:3000/pagamentos/${id}`, { status });
    console.log('Pagamento atualizado com sucesso!');
  } else if (action === 'Remover Pagamento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do pagamento:' }]);
    await axios.delete(`http://localhost:3000/pagamentos/${id}`);
    console.log('Pagamento removido com sucesso!');
  }

  await managePagamentos(); // Retorna ao menu de pagamentos
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
    await axios.post('http://localhost:3000/estabelecimentos', { nome, endereco, telefone });
    console.log('Estabelecimento criado com sucesso!');
  } else if (action === 'Listar Estabelecimentos') {
    const response = await axios.get('http://localhost:3000/estabelecimentos');
    console.log('Estabelecimentos:', response.data);
  } else if (action === 'Buscar Estabelecimento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do estabelecimento:' }]);
    const response = await axios.get(`http://localhost:3000/estabelecimentos/${id}`);
    console.log('Estabelecimento:', response.data);
  } else if (action === 'Atualizar Estabelecimento') {
    const { id, nome } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID do estabelecimento:' },
      { type: 'input', name: 'nome', message: 'Novo nome do estabelecimento:' },
    ]);
    await axios.put(`http://localhost:3000/estabelecimentos/${id}`, { nome });
    console.log('Estabelecimento atualizado com sucesso!');
  } else if (action === 'Remover Estabelecimento') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do estabelecimento:' }]);
    await axios.delete(`http://localhost:3000/estabelecimentos/${id}`);
    console.log('Estabelecimento removido com sucesso!');
  }

  await manageEstabelecimentos(); // Retorna ao menu de estabelecimentos
}

async function manageItensPedido() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer com os itens do pedido?',
      choices: [
        'Criar Item do Pedido',
        'Listar Itens do Pedido',
        'Buscar Item do Pedido',
        'Atualizar Item do Pedido',
        'Remover Item do Pedido',
        'Voltar',
      ],
    },
  ]);

  if (action === 'Voltar') return;

  if (action === 'Criar Item do Pedido') {
    const { produtoId, quantidade, pedidoId } = await inquirer.prompt([
      { type: 'number', name: 'produtoId', message: 'ID do produto:' },
      { type: 'number', name: 'quantidade', message: 'Quantidade:' },
      { type: 'number', name: 'pedidoId', message: 'ID do pedido:' },
    ]);
    await axios.post('http://localhost:3000/itens-pedido', { produtoId, quantidade, pedidoId });
    console.log('Item do pedido criado com sucesso!');
  } else if (action === 'Listar Itens do Pedido') {
    const response = await axios.get('http://localhost:3000/itens-pedido');
    console.log('Itens do Pedido:', response.data);
  } else if (action === 'Buscar Item do Pedido') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do item do pedido:' }]);
    const response = await axios.get(`http://localhost:3000/itens-pedido/${id}`);
    console.log('Item do Pedido:', response.data);
  } else if (action === 'Atualizar Item do Pedido') {
    const { id, quantidade } = await inquirer.prompt([
      { type: 'number', name: 'id', message: 'ID do item do pedido:' },
      { type: 'number', name: 'quantidade', message: 'Nova quantidade:' },
    ]);
    await axios.put(`http://localhost:3000/itens-pedido/${id}`, { quantidade });
    console.log('Item do pedido atualizado com sucesso!');
  } else if (action === 'Remover Item do Pedido') {
    const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'ID do item do pedido:' }]);
    await axios.delete(`http://localhost:3000/itens-pedido/${id}`);
    console.log('Item do pedido removido com sucesso!');
  }

  await manageItensPedido(); // Retorna ao menu de itens do pedido
}

main();