# 🚀 Etapa 1 — O que você precisa para o Node funcionar

Antes de pensar no seu sistema, você precisa ter o **ambiente Node pronto**.

## ✅ 1. Instalar o Node.js

Se ainda não tiver:

* Baixar em: Node.js
* Instalar normalmente

Depois testa no terminal:

```bash
node -v
npm -v
```

Se aparecer versão → ✅ ok

---

## ✅ 2. Criar o projeto

Na pasta onde você quer o sistema:

```bash
mkdir projetointegrador
cd projetointegrador
```

---

## ✅ 3. Inicializar o projeto Node

```bash
npm init -y
```

Isso cria o:

📄 `package.json`

---

## ✅ 4. Instalar dependências essenciais

Para um sistema web básico:

```bash
npm install express
```

Recomendado também:

```bash
npm install nodemon --save-dev
```

📌 O que cada um faz:

* `express` → servidor web
* `nodemon` → reinicia automaticamente o servidor

---

## ✅ 5. Criar estrutura de pastas

Crie exatamente assim:

```
projetointegrador/
│
├── sistema/
│   ├── config/
│   ├── controller/
│   ├── css/
│   ├── js/
│   ├── pages/
│   ├── uploads/
│   └── app.js
│
├── package.json
└── server.js
```

## ✅ 6. Rodar o projeto

No terminal:

```bash
node server.js
```

ou com nodemon:

```bash
npx nodemon server.js
```

---

## ✅ 7. Acessar

Abra no navegador:

```
http://localhost:3000
```

## 🚀 ETAPA 8 — Ajuste da estrutura

Fica assim:

projetointegrador/
│
├── sistema/
│   ├── config/
│   │   └── db.js       
│   ├── controller/
│   │   ├── produtos.js 
│   │   └── usuarios.js  
│   ├── css/
│   ├── img/            
│   ├── js/
│   │   └── index.js    
│   │   └── cadastroUsuario.js  
|   ├── layout/
|   │   ├── header.html
|   │   ├── menu.html
|   │   └── footer.html
│   ├── pages/
│   │   ├── index.html  
│   │   └── usuario.html
│   └── app.js
│
├── server.js
└── package.json



🎯 O QUE VAMOS IMPLEMENTAR

✔ login com senha criptografada (bcrypt)
✔ criação de sessão
✔ validar usuário logado
✔ proteger rotas
✔ controlar acesso por perfil (A, G, O)

🚀 1. INSTALAR DEPENDÊNCIA

No terminal:

```bash
npm install express-session bcrypt
```

No terminal, ai na raiz do projeto:

```bash
npm install multer
```