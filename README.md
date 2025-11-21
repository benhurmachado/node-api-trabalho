# 🏋️ API Plataforma de Exercícios Físicos

API RESTful completa para gerenciamento de treinos e exercícios físicos, desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

**Link do Deploy**: https://node-api-trabalho.onrender.com

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Entidades e Relacionamentos](#entidades-e-relacionamentos)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Deploy](#deploy)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)

## Sobre o Projeto

Esta API foi desenvolvida como trabalho avaliativo da disciplina de Tópicos Especiais em Tecnologias na Educação. O sistema permite que instrutores criem e gerenciem treinos e exercícios, enquanto alunos podem visualizar treinos e registrar seu histórico de atividades.

## Tecnologias Utilizadas

### Backend
- **Node.js** (v18+) - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset JavaScript com tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js

### Autenticação e Segurança
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcrypt** - Hash de senhas

### Validação e Documentação
- **express-validator** - Validação de dados de entrada
- **Swagger (swagger-jsdoc + swagger-ui-express)** - Documentação interativa da API

### Testes
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP

### Outras Dependências
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Habilitação de CORS

## Funcionalidades

### Autenticação
- [x] Registro de usuários (Instrutor ou Aluno)
- [x] Login com JWT
- [x] Proteção de rotas com middleware de autenticação
- [x] Controle de acesso baseado em tipo de usuário

### Instrutores
- [x] Criação de perfil de instrutor
- [x] Gerenciamento de treinos (CRUD completo)
- [x] Criação de exercícios
- [x] Visualização de estatísticas

### Alunos
- [x] Criação de perfil de aluno
- [x] Visualização de treinos disponíveis
- [x] Registro de histórico de treinos
- [x] Acompanhamento de progresso

### Exercícios
- [x] CRUD completo de exercícios
- [x] Filtros por grupo muscular e dificuldade
- [x] Vídeos demonstrativos (URL)

### Treinos
- [x] CRUD completo de treinos
- [x] Associação de exercícios aos treinos
- [x] Definição de séries, repetições e descanso
- [x] Níveis de dificuldade

## 📊 Entidades e Relacionamentos

### Diagrama ER

```
Usuario (1) --- (1) Instrutor
Usuario (1) --- (1) Aluno

Instrutor (1) --- (N) Treino

Treino (N) --- (M) Exercicio  [através de TreinoExercicio]

Aluno (N) --- (M) Treino  [através de HistoricoTreino]
```

### Entidades

1. **Usuario**
   - id, nome, email, senha (hash), tipo (instrutor/aluno), ativo

2. **Instrutor**
   - id, usuarioId, especialidade, cref, biografia, avaliacaoMedia

3. **Aluno**
   - id, usuarioId, dataNascimento, peso, altura, objetivo, nivelExperiencia

4. **Exercicio**
   - id, nome, descricao, grupoMuscular, equipamento, dificuldade, videoUrl

5. **Treino**
   - id, instrutorId, nome, descricao, duracaoMinutos, nivel, objetivo, ativo

6. **TreinoExercicio** (tabela de junção)
   - id, treinoId, exercicioId, series, repeticoes, descansoSegundos, observacoes, ordem

7. **HistoricoTreino** (tabela de junção)
   - id, alunoId, treinoId, dataRealizacao, duracaoRealMinutos, calorias, observacoes, avaliacaoTreino, concluido

## 📦 Pré-requisitos

- Node.js >= 18.x
- npm ou yarn
- Conta no NeonDB (ou outro provedor PostgreSQL)
- Git

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/plataforma-exercicios-api.git
cd plataforma-exercicios-api
```

### 2. Instale as dependências

```bash
npm install
```

## ⚙️ Configuração

### 1. Configurar Banco de Dados

1. Crie uma conta em [NeonDB](https://neon.tech/)
2. Crie um novo projeto
3. Copie a connection string fornecida

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000

# Database - Cole sua connection string do NeonDB aqui
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui_12345678
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=*
```

⚠️ **Importante**: Nunca commite o arquivo `.env` para o repositório!

### 3. Adicionar ao .gitignore

Certifique-se que seu `.gitignore` contém:

```
node_modules/
dist/
.env
.env.local
.env.*.local
```

## 🏃 Como Rodar Localmente

### Modo Desenvolvimento (com hot reload)

```bash
npm run dev
```

### Modo Produção

```bash
# Build do TypeScript
npm run build

# Iniciar servidor
npm start
```

O servidor estará rodando em `http://localhost:3000`

### Acessar Documentação

Acesse: `http://localhost:3000/api-docs`

## 🧪 Testes

### Rodar todos os testes

```bash
npm test
```

### Rodar testes em modo watch

```bash
npm run test:watch
```

### Cobertura de testes

```bash
npm test -- --coverage
```

## 📚 Documentação da API

### Swagger UI

Após iniciar o servidor, acesse a documentação interativa:

```
http://localhost:3000/api-docs
```

### Principais Endpoints

#### Autenticação

```
POST   /api/auth/registro  - Registrar novo usuário
POST   /api/auth/login     - Fazer login
GET    /api/auth/perfil    - Buscar perfil (requer autenticação)
```

#### Exercícios

```
GET    /api/exercicios        - Listar exercícios
GET    /api/exercicios/:id    - Buscar exercício
POST   /api/exercicios        - Criar exercício (instrutor)
PUT    /api/exercicios/:id    - Atualizar exercício (instrutor)
DELETE /api/exercicios/:id    - Deletar exercício (instrutor)
```

#### Treinos

```
GET    /api/treinos        - Listar treinos
GET    /api/treinos/:id    - Buscar treino
POST   /api/treinos        - Criar treino (instrutor)
PUT    /api/treinos/:id    - Atualizar treino (instrutor)
DELETE /api/treinos/:id    - Deletar treino (instrutor)
```

### Exemplo de Requisição

#### Registro de Usuário

```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "senha": "senha123",
    "tipo": "aluno"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@exemplo.com",
    "senha": "senha123"
  }'
```

#### Criar Exercício (com autenticação)

```bash
curl -X POST http://localhost:3000/api/exercicios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "nome": "Supino Reto",
    "descricao": "Exercício para peitoral",
    "grupoMuscular": "Peito",
    "equipamento": "Barra",
    "dificuldade": "medio"
  }'
```

## ☁️ Deploy

### Deploy no Render

1. Crie uma conta no [Render](https://render.com/)

2. Crie um novo Web Service:
   - Connect repository
   - Name: plataforma-exercicios-api
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. Configure as variáveis de ambiente:
   - `DATABASE_URL`: sua connection string do NeonDB
   - `JWT_SECRET`: sua chave secreta
   - `NODE_ENV`: production

4. Deploy!

**Link do Deploy**: https://node-api-trabalho.onrender.com

## 📁 Estrutura do Projeto

```
plataforma-exercicios-api/
├── src/
│   ├── config/
│   │   ├── database.ts          # Configuração Sequelize
│   │   └── swagger.ts           # Configuração Swagger
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── exercicioController.ts
│   │   └── treinoController.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   ├── loggingMiddleware.ts
│   │   ├── requestIdMiddleware.ts
│   │   └── validationMiddleware.ts
│   ├── models/
│   │   ├── index.ts             # Relacionamentos
│   │   ├── Usuario.ts
│   │   ├── Instrutor.ts
│   │   ├── Aluno.ts
│   │   ├── Exercicio.ts
│   │   ├── Treino.ts
│   │   ├── TreinoExercicio.ts
│   │   └── HistoricoTreino.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── authRoutes.ts
│   │   ├── exercicioRoutes.ts
│   │   └── treinoRoutes.ts
│   ├── validators/
│   │   ├── authValidator.ts
│   │   ├── exercicioValidator.ts
│   │   └── treinoValidator.ts
│   ├── types/
│   │   └── express.d.ts         # Tipagens customizadas
│   ├── utils/
│   │   └── errors.ts            # Classes de erro
│   ├── __tests__/
│   │   ├── unit/
│   │   └── integration/
│   ├── app.ts                   # Configuração Express
│   └── server.ts                # Inicialização do servidor
├── .env                         # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 📜 Scripts Disponíveis

```bash
npm run dev         # Inicia em modo desenvolvimento com hot reload
npm run build       # Compila TypeScript para JavaScript
npm start           # Inicia servidor em produção
npm test            # Executa todos os testes
npm run test:watch  # Executa testes em modo watch
```
