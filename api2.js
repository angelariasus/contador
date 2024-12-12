const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let contador = { suben: 0, bajan: 0 };

app.get('/contador', (req, res) => {
  res.json(contador);
});

app.post('/contador/suben', (req, res) => {
  contador.suben++;
  res.json(contador);
});

app.post('/contador/bajan', (req, res) => {
  contador.bajan++;
  res.json(contador);
});

app.post('/contador/reiniciar', (req, res) => {
  contador = { suben: 0, bajan: 0 };
  res.json(contador);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});