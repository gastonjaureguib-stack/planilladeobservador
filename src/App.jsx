import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";

import AsistenteObservacion from "./components/AsistenteObservacion";
import PlanillaPreview from "./components/PlanillaPreview";
import HistorialObservaciones from "./components/HistorialObservaciones";

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
  const [vista, setVista] = useState("nueva");

  const [formData, setFormData] = useState(observacionInicial);

  const [observacionEditando, setObservacionEditando] =
    useState(null);

  const [observaciones, setObservaciones] = useState(() => {
    const guardadas = localStorage.getItem("observaciones");

    return guardadas ? JSON.parse(guardadas) : [];
  });

  // Cada vez que cambia el historial,
  // actualizamos localStorage.
  useEffect(() => {
    localStorage.setItem(
      "observaciones",
      JSON.stringify(observaciones)
    );
  }, [observaciones]);

  const nuevaObservacion = () => {
    setFormData(observacionInicial);
    setObservacionEditando(null);
    setVista("nueva");
  };

  const guardarObservacion = async () => {
    if (!formData.club && !formData.fechaObservacion) {
      await Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Completá al menos el club y la fecha de observación.",
      });

      return;
    }

    // Si estamos editando, actualizamos la existente
    if (observacionEditando) {
      setObservaciones((prev) =>
        prev.map((observacion) =>
          observacion.id === observacionEditando
            ? {
                ...formData,
                id: observacionEditando,
              }
            : observacion
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        text: "La observación fue actualizada.",
      });
    } else {
      // Si es nueva, creamos un ID
      const nueva = {
        ...formData,
        id: crypto.randomUUID(),
        creadaEn: new Date().toISOString(),
      };

      setObservaciones((prev) => [
        nueva,
        ...prev,
      ]);

      await Swal.fire({
        icon: "success",
        title: "Observación guardada",
        text: "La planilla quedó guardada en Mis observaciones.",
      });
    }

    setObservacionEditando(null);
    setFormData(observacionInicial);
    setVista("historial");
  };

  const editarObservacion = (observacion) => {
    setFormData(observacion);
    setObservacionEditando(observacion.id);
    setVista("nueva");
  };

  const verObservacion = (observacion) => {
    setFormData(observacion);
    setObservacionEditando(null);
    setVista("ver");
  };

  const eliminarObservacion = (id) => {
    setObservaciones((prev) =>
      prev.filter((observacion) => observacion.id !== id)
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Observaciones de entrenamiento</h1>
          <p>Visoría de Licencia C</p>
        </div>

        <nav>
          <button
            type="button"
            onClick={nuevaObservacion}
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

      <main>

        {/* NUEVA / EDITAR */}

        {vista === "nueva" && (
          <>
            {observacionEditando && (
              <div className="modo-edicion">
                Editando observación
              </div>
            )}

            <AsistenteObservacion
              formData={formData}
              setFormData={setFormData}
            />

            <div className="acciones-planilla">
              <button
                type="button"
                className="btn-guardar"
                onClick={guardarObservacion}
              >
                {observacionEditando
                  ? "Guardar cambios"
                  : "Guardar observación"}
              </button>
            </div>

            <PlanillaPreview
              formData={formData}
            />
          </>
        )}


        {/* HISTORIAL */}

        {vista === "historial" && (
          <HistorialObservaciones
            observaciones={observaciones}
            onEditar={editarObservacion}
            onEliminar={eliminarObservacion}
            onVer={verObservacion}
          />
        )}


        {/* VER UNA OBSERVACIÓN */}

        {vista === "ver" && (
          <>
            <div className="acciones-planilla">
              <button
                type="button"
                className="btn-secundario"
                onClick={() => setVista("historial")}
              >
                ← Volver
              </button>

              <button
                type="button"
                className="btn-editar"
                onClick={() => editarObservacion(formData)}
              >
                Editar
              </button>
            </div>

            <PlanillaPreview
              formData={formData}
            />
          </>
        )}

      </main>
    </div>
  );
}

export default App;