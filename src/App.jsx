import { useState } from "react";
import "./App.css";

import AsistenteObservacion from "./components/AsistenteObservacion";
import PlanillaPreview from "./components/PlanillaPreview";

const observacionInicial = {
  nombreObservador: "",
  fechaObservacion: "",
  fechaEntrega: "",
  firmaProfesor: "",

  club: "",
  categoria: "",
  jugadoresPresentes: "",
  practicasSemanales: "",

  tecnicoNombre: "",
  experienciaJugador: "",
  capacitacionEntrenador: "",
  entrenaEquipo: "",

  estructuraSesion: "",
  tomaGrupo: "",
  presentacionTrabajo: "",
  calentamiento: "",
  partePrincipal: "",
  aprendizajeJuego: "",
  evaluacionJugadores: "",
  tiempoSesion: "",

  espacioDisponible: "",
  materialDisponible: "",
  actitudPedagogica: "",
  presentacion: "",
  demostracion: "",
  consignasCorrectas: "",

  alcancesSesion: "",
  planificacionCortoLargoPlazo: "",

  comportamientoEducador: "",
  participacionNinos: "",

  recoleccionMaterial: "",

  puntosPositivos: "",
  puntosMejorar: "",
  sesionAdaptada: "",

  otrosDatos: "",
  planificacionGrafica: "",
};

function App() {
  // Controla qué pantalla estamos viendo
  const [vista, setVista] = useState("nueva");

  // Guarda los datos de la observación actual
  const [formData, setFormData] = useState(observacionInicial);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <h1>Observaciones de entrenamiento</h1>
          <p>Visoría de Licencia C</p>
        </div>

        <nav>
          <button
            type="button"
            onClick={() => setVista("nueva")}
          >
            Nueva observación
          </button>

          <button
            type="button"
            onClick={() => setVista("historial")}
          >
            Mis observaciones
          </button>
        </nav>

      </header>


      {/* CONTENIDO */}
      <main>

        {/* ======================== */}
        {/* NUEVA OBSERVACIÓN        */}
        {/* ======================== */}

        {vista === "nueva" && (
          <>

            <AsistenteObservacion
              formData={formData}
              setFormData={setFormData}
            />

            <PlanillaPreview
              formData={formData}
            />

          </>
        )}


        {/* ======================== */}
        {/* HISTORIAL               */}
        {/* ======================== */}

        {vista === "historial" && (
          <section className="historial">

            <h2>Mis observaciones</h2>

            <p>
              Acá van a aparecer las observaciones guardadas.
            </p>

          </section>
        )}

      </main>

    </div>
  );
}

export default App;