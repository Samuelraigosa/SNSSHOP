const express = require('express');
const cors = require('cors');
const productosRouter = require('./productosRoute'); // El archivo donde pusiste las rutas
const usuariosRouter = require('./usuariosRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productosRouter);
app.use('/api', usuariosRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});