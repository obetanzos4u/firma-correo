const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imgs/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Inicializar Multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Ruta POST para manejar la carga de imágenes
// router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
//   console.log('Solicitud recibida en /subir-imagen');
//   if (req.file) {
//     console.log('Archivo cargado:', req.file);
//   } else {
//     console.log('No se cargó ningún archivo.');
//   }
//   res.status(200).send('Imagen cargada con éxito');
// });

router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
  if (req.file) {
    // Procesar el archivo cargado si existe
    res.status(200).send('Imagen cargada con éxito');
  } else {
    // Manejar el caso en que no se cargó ningún archivo
    res.status(400).send('No se recibió ningún archivo.');
  }
});

module.exports = router;


