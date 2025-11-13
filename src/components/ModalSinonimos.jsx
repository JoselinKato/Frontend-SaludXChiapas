import React, { useState } from 'react';
import '../styles/ModalSinonimos.css'; 
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const ModalSinonimos = ({ sintoma, onClose, onAgregar, onEditar, onEliminar }) => {
  const [nuevoSinonimo, setNuevoSinonimo] = useState('');
  const [editando, setEditando] = useState(null);

  const handleAgregarClick = () => {
    if (nuevoSinonimo.trim()) {
      onAgregar(sintoma.id, nuevoSinonimo.trim());
      setNuevoSinonimo(''); 
    }
  };

  const handleIniciarEdicion = (sin) => {
    setEditando({ original: sin, texto: sin });
  };

  const handleCancelarEdicion = () => {
    setEditando(null);
  };

  const handleGuardarEdicion = () => {
    if (editando && editando.texto.trim() && editando.texto.trim() !== editando.original) {
      onEditar(sintoma.id, editando.original, editando.texto.trim());
    }
    setEditando(null); 
  };

  const handleEliminarClick = (sin) => {
    if (window.confirm(`¿Estás seguro de eliminar el sinónimo "${sin}"?`)) {
      onEliminar(sintoma.id, sin);
    }
  };


  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        
        <h2>{sintoma.nombre}</h2>
        <p className="sinonimos-title">Sinónimos del síntoma</p>

        <div className="sinonimos-list">
          {sintoma.sinonimos.length > 0 ? (
            sintoma.sinonimos.map((sin, index) => (
              <div key={index} className="sinonimo-item">
                {editando && editando.original === sin ? (
                  <div className="sinonimo-edit-mode">
                    <input
                      type="text"
                      className="sinonimo-input-edit" 
                      value={editando.texto}
                      onChange={(e) => setEditando({ ...editando, texto: e.target.value })}
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleGuardarEdicion()}
                    />
                    <button onClick={handleGuardarEdicion} className="btn-icon btn-save"><FaSave title="Guardar" /></button>
                    <button onClick={handleCancelarEdicion} className="btn-icon btn-cancel"><FaTimes title="Cancelar" /></button>
                  </div>
                ) : (
                  <>
                    <span>{sin}</span>
                    <div className="sinonimo-actions">
                      <button onClick={() => handleIniciarEdicion(sin)} className="btn-icon btn-edit"><FaEdit title="Editar" /></button>
                      <button onClick={() => handleEliminarClick(sin)} className="btn-icon btn-delete"><FaTrash title="Eliminar" /></button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-sinonimos">No hay sinónimos registrados.</p>
          )}
        </div>

        <div className="agregar-sinonimo-form">
          <input
            type="text"
            value={nuevoSinonimo}
            onChange={(e) => setNuevoSinonimo(e.target.value)}
            placeholder="Escribir nuevo sinónimo"
            className="input-nuevo-sinonimo" 
            onKeyDown={(e) => e.key === 'Enter' && handleAgregarClick()}
          />
          <button onClick={handleAgregarClick} className="modal-btn btn-agregar">
            Agregar sinónimo
          </button>
        </div>
        
        <button onClick={onClose} className="modal-btn btn-cerrar">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalSinonimos;