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
  subenParadero: 0,
  bajanParadero: 0,
  estado: 0  
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

app.post('/contador/estado', (req, res) => {
  const { estado } = req.body;
  
  if (estado !== 0 && estado !== 1) {
    return res.status(400).json({ error: 'El valor de estado solo puede ser 0 o 1.' });
  }

  contador.estado = estado;
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
