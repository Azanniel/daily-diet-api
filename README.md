# 🥗 Daily Diet

> Um sistema para registrar refeições de um usuário e acompanhar sua jornada de alimentação.

## Como começar

Para iniciar a aplicação na porta especifica (3333), utilize: 

```bash
bun dev
```
A aplicação utiliza variáveis de ambiente para definir banco de dados e porta, logo crie uma arquivo `.env` e defina as variáveis de ambiente.
```env
PORT=3333
DATABASE_URL=./db.sqlite
```

Os testes de ponta a ponta também utilizam variáveis de ambiente, logo crie um arquivo `.env.test` e defina as variáveis de ambiente.
```env
DATABASE_URL=./db-test.sqlite
```

aqui definimos somente uma variável nova para o banco de dados ser separado, então para executar os testes use (usamos apenas teste de ponta a ponta nesse projeto):

```bash
bun run test
```

## Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] As refeições devem ser relacionadas a um usuário.
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## ☕ Contatos

Você vai me encontrar em qualquer uma das redes sociais abaixo:

<a href = "mailto: leo.azannielttt@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" margin-right="10px"></a>
<a href="https://www.linkedin.com/in/leandroazanniel/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://api.whatsapp.com/send?phone=5592985406269" target="_blank"><img src="https://img.shields.io/badge/-WhatsApp-%25D366?style=for-the-badge&logo=whatsapp&logoColor=white" target="_blank"></a>