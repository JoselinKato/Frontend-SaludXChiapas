import React, { useState, useEffect } from 'react';
import { mockSintomas } from '../data/mockData';
import BarraBusqueda from '../components/BarraBusqueda';
import SintomaCard from '../components/SintomaCard';
import ModalSinonimos from '../components/ModalSinonimos';
import '../styles/GestionTerminos.css'; 

const GestionTerminos = () => {
  const [sintomas, setSintomas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [sintomaSeleccionado, setSintomaSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    //aquí fetch.

    setSintomas(mockSintomas);
  }, []);

  // --- Manejadores del Modal ---
  const handleVerMas = (sintoma) => {
    setSintomaSeleccionado(sintoma);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setTimeout(() => setSintomaSeleccionado(null), 300);
  };

  // --- Simulación de funciones CRUD (API) ---
  // aquí llamar a API (fetch, axios)

  const handleAgregarSinonimo = (sintomaId, nuevoSinonimo) => {
    console.log(`API (POST): Agregar '${nuevoSinonimo}' a síntoma ${sintomaId}`);
    
    // Simulación de actualización de estado
    const sintomasActualizados = sintomas.map(s =>
      s.id === sintomaId
        ? { ...s, sinonimos: [...s.sinonimos, nuevoSinonimo] }
        : s
    );
    setSintomas(sintomasActualizados);

    // Actualizar también el estado en el modal
    setSintomaSeleccionado(prev => ({
      ...prev,
      sinonimos: [...prev.sinonimos, nuevoSinonimo]
    }));
  };

  const handleEditarSinonimo = (sintomaId, sinonimoOriginal, sinonimoEditado) => {
    console.log(`API (PUT): En ${sintomaId}, cambiar '${sinonimoOriginal}' por '${sinonimoEditado}'`);
    
    // Simulación de actualización de estado
    const sintomasActualizados = sintomas.map(s =>
      s.id === sintomaId
        ? { ...s, sinonimos: s.sinonimos.map(sin => (sin === sinonimoOriginal ? sinonimoEditado : sin)) }
        : s
    );
    setSintomas(sintomasActualizados);

    // Actualizar estado en el modal
    setSintomaSeleccionado(prev => ({
      ...prev,
      sinonimos: prev.sinonimos.map(sin => (sin === sinonimoOriginal ? sinonimoEditado : sin))
    }));
  };

  const handleEliminarSinonimo = (sintomaId, sinonimoAEliminar) => {
    console.log(`API (DELETE): Eliminar '${sinonimoAEliminar}' de ${sintomaId}`);
    
    // Simulación de actualización de estado
    const sintomasActualizados = sintomas.map(s =>
      s.id === sintomaId
        ? { ...s, sinonimos: s.sinonimos.filter(sin => sin !== sinonimoAEliminar) }
        : s
    );
    setSintomas(sintomasActualizados);

    // Actualizar estado en el modal
    setSintomaSeleccionado(prev => ({
      ...prev,
      sinonimos: prev.sinonimos.filter(sin => sin !== sinonimoAEliminar)
    }));
  };

  // --- Fin Simulación CRUD ---

  // Filtrar síntomas basado en la búsqueda
  const sintomasFiltrados = sintomas.filter(s =>
    s.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="gestion-page">
      <header className="gestion-header">
        {/* Botón de retroceso que pediste */}
        <button 
          onClick={""} 
          className="btn-retroceder"
        >
          &larr; Volver
        </button>
        <h1>Gestión de términos coloquiales</h1>
      </header>

      <div className="gestion-content">
        <BarraBusqueda
          placeholder="Buscar por término médico"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <div className="sintomas-grid">
          {sintomasFiltrados.length > 0 ? (
            sintomasFiltrados.map(sintoma => (
              <SintomaCard
                key={sintoma.id}
                nombre={sintoma.nombre}
                onVerMas={() => handleVerMas(sintoma)}
              />
            ))
          ) : (
            <p>No se encontraron síntomas.</p>
          )}
        </div>
      </div>

      {/* Renderizado condicional del modal */}
      {modalAbierto && sintomaSeleccionado && (
        <ModalSinonimos
          sintoma={sintomaSeleccionado}
          onClose={handleCerrarModal}
          onAgregar={handleAgregarSinonimo}
          onEditar={handleEditarSinonimo}
          onEliminar={handleEliminarSinonimo}
        />
      )}
    </div>
  );
};

export default GestionTerminos;