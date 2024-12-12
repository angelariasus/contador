const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

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
  contador.subenParadero++;
  res.json(contador);
});

app.post('/contador/bajan', (req, res) => {
  contador.bajan++;
  contador.bajanParadero++;
  res.json(contador);
});

app.post('/contador/reiniciar', (req, res) => {
  contador.suben = 0;
  contador.bajan = 0;
  contador.subenParadero = 0;
  contador.bajanParadero = 0;
  res.json(contador);
});

app.post('/contador/actualizarParadero', (req, res) => {
  const { subenParadero, bajanParadero } = req.body;
  if (typeof subenParadero !== 'number' || typeof bajanParadero !== 'number') {
    return res.status(400).json({ error: 'Los valores deben ser números.' });
  }
  if (subenParadero < 0 || bajanParadero < 0) {
    return res.status(400).json({ error: 'Los valores no pueden ser negativos.' });
  }
  contador.subenParadero = subenParadero;
  contador.bajanParadero = bajanParadero;
  res.json(contador);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
