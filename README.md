# 🧪 Projeto de Prática: Backend-for-Frontend (BFF) com Angular + Nitro + PocketBase

Este repositório demonstra a aplicação do padrão **Backend-for-Frontend (BFF)** em um cenário prático, usando:

- ⚙️ **Frontend Angular**
- 🌐 **Backend-for-Frontend (BFF) com Nitro**
- 💾 **PocketBase** (banco de dados leve com REST API integrada)

> 🎯 O objetivo é exercitar a separação de responsabilidades, segurança e estrutura escalável ao integrar frontend e backend via uma camada intermediária (BFF).

---

## 📁 Estrutura do Projeto

### Back-for-Frontend-practice/

> ├── frontend-angular     - Aplicação Angular (interface do usuário)
> <br>
> ├── bff-nitro           - Backend-for-Frontend com Nitro
> <br>
> └── db.json              - Mock inicial do banco de dados

---



## ⚙️ Tecnologias Utilizadas

| Camada         | Tecnologia           |
| -------------- | -------------------- |
| Frontend       | Angular 17           |
| BFF            | Nitro (Nitro Server) |
| Banco de dados | PocketBase           |
| Comunicação    | HTTP/REST via BFF    |

---

## 🔄 Como funciona a arquitetura

[ Angular ] → [ BFF (Nitro) ] → [ PocketBase ]

- O frontend **nunca se comunica diretamente com o PocketBase**.
- O **BFF** filtra, formata, valida e protege os dados antes de entregá-los ao cliente.
- O **PocketBase** atua como banco de dados + API REST leve e rápido.

---

## 📌 Funcionalidades principais

- ✅ Exibição de dados (“painéis”) armazenados no PocketBase
- 🔐 Proteção de dados via BFF
- 🧼 Lógica de apresentação concentrada no frontend, lógica de negócio no BFF
- 🧪 Projeto modular para testar facilmente outras APIs/BFFs

---

## 📂 Principais arquivos

| Local                             | Descrição                             |
| --------------------------------- | ------------------------------------- |
| frontend-angular/src/app/services | Serviços para consumir dados do BFF   |
| bff-nitro/server/api              | Rotas que o BFF expõe para o frontend |
| db.json                           | Dados base da aplicação               |

---

## 🧪 Sugestões de melhorias futuras

- Autenticação com JWT/OAuth
- Cache de dados no BFF
- Validações com Zod ou Yup no backend
- Testes automatizados (unitários e de integração)
- Deploy com Docker + CI/CD

---

## 🧠 Por que usar BFF?

O padrão **Backend-for-Frontend (BFF)**:

- 📱 Adapta respostas para diferentes clientes (web, mobile)
- 🔒 Protege endpoints e dados sensíveis
- ⚙️ Centraliza regras de negócio
- 🔄 Reduz acoplamento entre frontend e serviços backend

Leia mais:  
BFF: Backend for Frontend – Bits and Pieces: https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf

---

## 📄 Creators

👾 Vinicius Dias (https://github.com/ViniDias1)
<br>
👾 Douglas Andrade (https://github.com/dougaandrade)

---
