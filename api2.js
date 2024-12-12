const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');  

app.use(cors());
app.use(bodyParser.json());

let contador = {
  suben: 0,
  bajan: 0,
  paradero: 0,
  subenParadero: 0,
  bajanParadero: 0
};

app.get('/contador', (req, res) => {
  res.json(contador);
});

app.post('/contador/suben', (req, res) => {
  contador.suben++;
  if (contador.paradero === 1) {
    contador.subenParadero++;
  }
  res.json(contador);
});

app.post('/contador/bajan', (req, res) => {
  contador.bajan++;
  if (contador.paradero === 1) {
    contador.bajanParadero++;
  }
  res.json(contador);
});

app.post('/contador/reiniciar', (req, res) => {
  contador.suben = 0;
  contador.bajan = 0;
  contador.subenParadero = 0;
  contador.bajanParadero = 0;
  res.json(contador);
});

app.post('/contador/paradero', (req, res) => {
  const { estado } = req.body;
  console.log(`Estado recibido: ${estado}`);  
  if (estado === 0) {
    contador.subenParadero = 0;
    contador.bajanParadero = 0;
  }
  contador.paradero = estado;
  res.json(contador);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
