# 📌 Instruções para Rodar os Projetos

## 🚀 Passos para Rodar os Projetos

### 🔹 1. Instalar as dependências
Antes de iniciar os projetos, abra o terminal na pasta raiz e execute:

```sh
npm install typescript ts-node sqlite3 typeorm readline-sync --save
```

---

```sh
npm install --save-dev @types/readline-sync
```
Isso garantirá que todas as bibliotecas necessárias sejam instaladas.

---

### 🔹 2. Comandos para Executar os Projetos  

- Para **iniciar automaticamente o Projeto 2**, use:  
  ```sh
  npm start
  ```
- Para **rodar o Projeto 1**, use:  
  ```sh
  npm run projeto1
  ```
- Para **rodar o Projeto 2 manualmente**, use:  
  ```sh
  npm run projeto2
  ```

---

## 🛠 Configuração do `package.json`
Certifique-se de que o arquivo `package.json` contém a seguinte configuração de scripts:

```json
"scripts": {
  "start": "npx ts-node projeto2/src/cli/menu.ts",
  "projeto1": "npx ts-node projeto1/src/cli/menu.ts",
  "projeto2": "npx ts-node projeto2/src/cli/menu.ts"
}
```

---
