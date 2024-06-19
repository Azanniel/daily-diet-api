# 🥗 Daily Diet

> Um sistema para registrar refeições de um usuário e acompanhar sua jornada de alimentação.

## Como começar

Para iniciar a aplicação na porta especificar, utilize: 

```bash
bun dev
```

para executar os testes use (usamos apenas teste de ponta a ponta nesse projeto):

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
- [ ] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou