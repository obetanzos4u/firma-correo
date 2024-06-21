import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Estado para controlar el indicador de carga

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setUploading(true); // Iniciar el indicador de carga
    const formData = new FormData();
    formData.append('imagen', file);

    // Utilizar la variable de entorno para la URL de la API
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.post(`${apiUrl}/api/subir-imagen`, formData)
      .then(response => {
        console.log('Imagen cargada con éxito', response);
        setUploading(false); // Detener el indicador de carga
        // Aquí podrías actualizar el estado para mostrar un mensaje de éxito al usuario
      })
      .catch(error => {
        console.error('Error al cargar la imagen', error);
        setUploading(false); // Detener el indicador de carga
        // Aquí podrías actualizar el estado para mostrar un mensaje de error al usuario
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={uploading}>Cargar Imagen</button>
        {uploading && <p>Cargando...</p>} {/* Feedback visual durante la carga */}
      </form>
    </div>
  );
}

export default App;
