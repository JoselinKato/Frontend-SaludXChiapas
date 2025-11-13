import React from 'react';
import '../styles/SintomaCard.css';

const SintomaCard = ({ nombre, onVerMas }) => {
  return (
    <div className="sintoma-card">
      <span className="sintoma-nombre">{nombre}</span>
      <button onClick={onVerMas} className="sintoma-ver-mas">
        Ver más
      </button>
    </div>
  );
};

export default SintomaCard;