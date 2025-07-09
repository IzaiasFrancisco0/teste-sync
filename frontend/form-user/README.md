## 🚀 Tecnologias Utilizadas

- **React 19**
- **React Router DOM v7**
- **Zod** (validação de dados)
- **Axios** (requisições HTTP)
- **Vite** (ferramenta de build)
- **CSS Modules** (estilização isolada por componente)

## 🛠️ Instalação e Uso

### 1. Clonar o repositório

git clone https://github.com/IzaiasFrancisco0/frontend-teste-sync.git
cd frontend/form-user

## 2. Instalar as dependências

npm install

## 3. Iniciar o projeto

npm run dev

## ⚙️ Scripts Disponíveis

- npm run dev — Inicia o servidor local com Vite.
- npm run build — Gera a versão de produção.
- npm run preview — Visualiza o build localmente.
- npm run lint — Verifica problemas de lint no código.

## 📁 Estrutura do Projeto

form-user/
├── public/
├── src/
│   ├── components/     # Componentes reutilizáveis e formulários
│   ├── schemas/        # Schemas de validação com Zod
│   ├── styles/         # Estilos com CSS Modules
│   ├── App.jsx         # Componente principal com rotas
│   └── main.jsx        # Ponto de entrada do React
├── index.html
├── package.json
└── vite.config.js