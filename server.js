const express = require('express');
const routes = require('./routes'); // Importa el módulo de rutas
const cors = require('cors');
const app = express();
const path = require('path');

const corsOptions = {
  origin: 'https://firmas-de-correo.pages.dev', // Reemplaza con el dominio de tu aplicación frontend
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) se bloquean con 204
};

app.use(cors(corsOptions));

// Servir archivos estáticos desde la carpeta 'public/imgs'
app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliza las rutas definidas en routes.js
app.use('/api', routes);

// Manejo de errores para la ruta de carga
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send('Ocurrió un error durante la carga');
  } else {
    next();
  }
});

// Iniciar el servidor con un puerto dinámico
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
