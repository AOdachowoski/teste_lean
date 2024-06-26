# **👾** **Estrutura da Aplicação**

### A aplicação será composta pelas seguintes partes principais:

1. **Tela de Login**:
    - Inputs para usuário e senha.
    - Verificação mock (usando NextAuth) dos dados inseridos.
    - Redirecionamento para a tela de listagem de usuários em caso de sucesso.
    - Mensagens de erro em caso de falha na autenticação.
    
2. **Tela de Listagem de Usuários**:
    - Tabela dinâmica com dados dos usuários.
    - Funcionalidades de ordenação por diferentes colunas.
    - Barra de pesquisa para filtragem de usuários.
    - Filtros avançados para campos específicos.
    - Controle de mudança de status dos usuários.

---

# **👩‍💻** **Escolhas Técnicas**

1. **Framework e Bibliotecas**:
    - **React/Next.js**: Utilizado pela sua robustez e capacidade de gerar páginas estáticas e dinâmicas, além de oferecer um roteamento eficiente.
    - **TypeScript**: Facilita a manutenção e escalabilidade do código, fornecendo tipagens estáticas.
    - **Material-UI (MUI)**: Biblioteca de componentes de UI que facilita a criação de uma interface responsiva e estilizada conforme o design fornecido.
    
2. **Requisições HTTP**:
    - **axios**: Biblioteca para realizar requisições HTTP, escolhida pela sua simplicidade e eficiência.
    - **json-server**: Utilizado para simular um servidor RESTful com os dados fornecidos.
    
3. **Roteamento**:
    - **Next.js Routing**: Sistema de roteamento embutido no Next.js que simplifica a navegação entre as páginas da aplicação.
    
# **🦾** **Estrutura de Diretórios**
![image](https://github.com/AOdachowoski/teste_lean/assets/100538853/3c83b8a2-5cdf-4fe3-84fc-7c6b5dd8cff6)

# **👩‍💻** **Funcionalidades e Fluxo da Aplicação**

1. **Tela de Login**:
    - Usuário insere nome e senha.
    - Sistema verifica se as credenciais correspondem ao mock (NextAuth).
    - Em caso positivo, redireciona para **`/dashboard-cliente`**.
    - Em caso negativo, exibe mensagem de erro nos campos e na sessão.
    
2. **Tela de Listagem de Usuários**:
    - Requisição GET para **`/users`** ao carregar a página.
    - Exibição dos dados em uma tabela com funcionalidades de ordenação.
    - Implementação de uma barra de pesquisa para filtrar os dados.
    - Adição de filtros avançados para pesquisa detalhada.
    - Controle de status (ativo/inativo) dos usuários via dropdown.
    

# **🖥 Documentação de Instalação e Execução**

1.  **Pré-requisitos:**
    - Node.js v19.8.1
    

## Instalação

1. Clone o repositório:
    
    ```
    https://github.com/AOdachowoski/teste_lean.git
    cd teste_lean
    ```
    
2. Instale as dependências:
    
    ```
    npm install
    ```
    

## **Executando o Servidor JSON**

1. Abra o terminal no diretório do projeto e execute o comando abaixo para iniciar o json-server local:
    
    ```bash
    npx json-server --watch db.json --port 3000
    ```
    
    Mantenha o json-server rodando.
    

## **Executando o Projeto**

1. Abra uma nova guia de terminal dentro do diretório do projeto e execute:
    
    ```bash
    npm run dev
    ```
    
2. O projeto será iniciado e estará disponível no seguinte endereço:
    
    ```arduino
    http://localhost:3001
    ```
    
    ## **⚠️ Observações**
    
    - O arquivo **`.env`** está incluso no commit por motivos de simplicidade para este desafio técnico. Ele não contém informações privadas.
    - Credenciais de acesso estão disponíveis dentro do arquivo **`.env`**.
    

## **Funcionalidades**

- Tela de login com autenticação mock.
- Listagem de usuários com ordenação e filtros.
- Controle de status dos usuários.

## **Tecnologias Utilizadas**

- React/Next.js
- TypeScript
- Material-UI
- Axios
- Json-server
