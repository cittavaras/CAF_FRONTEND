import React, { useState } from 'react';

const AdminControl = ({ onInfoCargada }) => {
  const [imagen, setImagen] = useState('');
  const [texto, setTexto] = useState('');

  const handleCargarImagen = (event) => {
    const imagenCargada = event.target.files[0];
    setImagen(URL.createObjectURL(imagenCargada));
  };

  const handleModificarTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleGuardarInfo = () => {
    // Aquí puedes realizar cualquier lógica adicional antes de enviar la información al componente padre
    onInfoCargada({ imagen, texto });
  };

  return (
    <div>
      <div>
        <img src={imagen} alt="Imagen del gimnasio" />
        <input type="file" accept="image/*" onChange={handleCargarImagen} />
      </div>
      <div>
        <textarea value={texto} onChange={handleModificarTexto} />
      </div>
      <button onClick={handleGuardarInfo}>Guardar Información</button>
    </div>
  );
};

export default AdminControl;
