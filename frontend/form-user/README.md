Tecnologias utilizadas

React 19
React Router DOM v7
Zod (validação de dados)
Axios (requisições HTTP)
Vite (ferramenta de build)
CSS Modules (estilização isolada por componente)

--------------------------------------------------------
Como rodar localmente:

1 - Clone o repositório

git clone https://github.com/IzaiasFrancisco0/frontend-teste-sync.git
cd frontend
cd form-user

----------------------------------------------------
2 - Instale as dependências

npm install

----------------------------------------------------
3 - Inicie o projeto

npm run dev

-----------------------------------------------------
Comandos do script: 

npm run dev	    Inicia o servidor local com Vite
npm run build	Gera versão de produção
npm run preview	Visualiza build localmente
npm run lint	Verifica problemas de lint

-------------------------------------------------------
Estrutura do projeto:

src/
├── components/        # Componentes de UI e formulários
├── schemas/           # Schema de validação Zod
├── styles/            # CSS Modules
├── App.jsx            # Roteamento principal
└── main.jsx           # Ponto de entrada do React