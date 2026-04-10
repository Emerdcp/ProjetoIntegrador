# 🚀 Guia de Instalação e Funcionamento

## 📌 Etapa 1 — Preparar o ambiente Node.js

Antes de iniciar o sistema, é necessário ter o ambiente Node configurado.

### ✅ Instalar o Node.js

* Baixe em: [https://nodejs.org](https://nodejs.org)
* Instale normalmente

Verifique no terminal:

```bash
node -v
npm -v
```

Se aparecer a versão → ✅ OK

---

## 📁 Etapa 2 — Criar o projeto

No diretório desejado:

```bash
mkdir projetointegrador
cd projetointegrador
```

---

## ⚙️ Etapa 3 — Inicializar o projeto

```bash
npm init -y
```

Isso criará o arquivo:

📄 `package.json`

---

## 📦 Etapa 4 — Instalar dependências

### Dependência principal

```bash
npm install express
```

### Dependência de desenvolvimento

```bash
npm install nodemon --save-dev
```

### Dependências adicionais

```bash
npm install cors
```

### 📌 Função das dependências

* `express` → servidor web
* `nodemon` → reinicia o servidor automaticamente

---

## 🗂️ Etapa 5 — Estrutura inicial

```bash
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

---

## ▶️ Etapa 6 — Executar o projeto

### Execução padrão

```bash
node server.js
```

### Modo desenvolvimento (recomendado)

```bash
npx nodemon server.js
```

---

## 🌐 Etapa 7 — Acessar o sistema

Abra no navegador:

```
http://localhost:3000
```

---

## 🏗️ Etapa 8 — Estrutura final do projeto

```bash
projetointegrador/
│
├── sistema/
│   ├── config/
│   │   └── db.js       
│   │
│   ├── controller/
│   │   ├── produtos.js 
│   │   └── usuarios.js  
│   │
│   ├── css/
│   ├── img/            
│   │
│   ├── js/
│   │   ├── index.js    
│   │   └── cadastroUsuario.js  
│   │
│   ├── layout/
│   │   ├── header.html
│   │   ├── menu.html
│   │   └── footer.html
│   │
│   ├── pages/
│   │   ├── index.html  
│   │   └── usuario.html
│   │
│   └── app.js
│
├── server.js
└── package.json
```

## 🔐 Etapa 9 — Instalar dependências adicionais

No terminal, na raiz do projeto:

```bash
npm install express-session bcrypt
```

### Upload de arquivos

```bash
npm install multer
```