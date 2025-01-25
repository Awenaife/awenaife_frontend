# Awenaife Project Setup

Este guia descreve os passos necessários para configurar o ambiente de desenvolvimento de um projeto React utilizando Vite em Node.js 18.

## Pré-requisitos

Certifique-se de que você possui as seguintes ferramentas instaladas em sua máquina:

- [Node.js 18](https://nodejs.org/) (ou superior)
- [Git](https://git-scm.com/)
- Um gerenciador de pacotes como [npm](https://www.npmjs.com/) (instalado com o Node.js) ou [Yarn](https://yarnpkg.com/)
- [vscode] (https://code.visualstudio.com/) para IDE

---

## Passo a Passo

### 1. Clonar o repositório

Use o comando abaixo para clonar o repositório do GitHub:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Substitua `seu-usuario/seu-repositorio` pela URL do repositório do projeto.

Acesse o diretório do projeto:

```bash
cd seu-repositorio
```

---

### 2. Instalar dependências

Instale as dependências do projeto executando:

#### Usando npm:

```bash
npm install
```

#### Ou usando Yarn:

```bash
yarn install
```

---

### 3. Configuração de ambiente

Se o projeto exigir variáveis de ambiente, crie um arquivo `.env` na raiz do projeto com base no arquivo de exemplo `.env.example` (caso exista):

```bash
cp .env.example .env
```

Atualize as variáveis de ambiente no arquivo `.env` conforme necessário.

---

### 4. Rodar o servidor de desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando:

#### Usando npm:

```bash
npm run dev
```

#### Ou usando Yarn:

```bash
yarn dev
```

O servidor estará disponível no endereço: [http://localhost:5173](http://localhost:5173).

---

### 5. Build da aplicação

Para gerar o build de produção, execute o comando:

#### Usando npm:

```bash
npm run build
```

#### Ou usando Yarn:

```bash
yarn build
```

Os arquivos gerados estarão na pasta `dist/`.

---

### 6. Pré-visualizar o build de produção (opcional)

Para pré-visualizar o build gerado:

#### Usando npm:

```bash
npm run preview
```

#### Ou usando Yarn:

```bash
yarn preview
```

O build estará disponível em um servidor local para verificação.

---

## Scripts Disponíveis

- `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
- `npm run build` ou `yarn build`: Gera o build de produção.
- `npm run preview` ou `yarn preview`: Pré-visualiza o build gerado.

---

## Suporte

Se você encontrar problemas, por favor, abra uma [issue](https://github.com/seu-usuario/seu-repositorio/issues) no repositório ou entre em contato com o mantenedor do projeto.

---

**Divirta-se codando! 🚀**
