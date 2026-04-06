const express = require("express");
const cors = require("cors");
const app = express();

// IMPORTA SUAS ROTAS
const routes = require("./app");

app.use(cors());
app.use(express.json());

// USA AS ROTAS
app.use(routes);

// PORTA DINÂMICA (IMPORTANTE PRA RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});