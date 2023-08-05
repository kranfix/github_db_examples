const { signUp, login, createRepo } = require("./utilsDatabase");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Importar body-parser
const app = express();
app.use(cors());
const port = 3000;
app.use(bodyParser.json());

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.get("/signup", async (req, res) => {
  console.log("request signup", req.body);
  const { name, email, password } = req.body;
  const response = await signUp({ name, email, password });
  console.log("response:", response);
  res.json(response);
});

app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await login({ email, password });
  res.json(response);
});

app.get("/createrepo", async (req, res) => {
  const { repo, email, token } = req.body;
  const response = await createRepo({ repo, email, token });
  res.json(response);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
