## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express v5**
- **MySQL (com MySQL2)**
- **Zod** (validação de dados)
- **Multer** (upload de arquivos)
- **Dotenv** (variáveis de ambiente)
- **CORS**
- **Nodemon / ts-node / ts-node-dev**

## 🛠️ Instalação e Uso

## 1. Clonar o repositório

git clone https://github.com/IzaiasFrancisco0/backend-teste-sync.git
cd backend
npm install

## 2. Configurar o arquivo .env

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

## 4. Rodar em desenvolvimento

npm run dev

## 5. Compilar e rodar em produção

npm run build
npm start

## ⚙️ Scripts Disponíveis

- npm run dev — Inicia o servidor em modo de desenvolvimento com Nodemon e ts-node.
- npm run build — Compila os arquivos TypeScript para a pasta dist/.
- npm start — Inicia o servidor em produção com os arquivos da pasta dist/.

## 📁 Estrutura do Projeto

backend/
├── node_modules/
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── schemas/
│ ├── database/
│ └── index.ts
├── dist/ # Arquivos compilados
├── .env # Variáveis de ambiente
├── tsconfig.json
├── package.json
└── README.md
