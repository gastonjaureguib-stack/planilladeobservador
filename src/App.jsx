import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";

import AsistenteObservacion from "./components/AsistenteObservacion";
import PlanillaPreview from "./components/PlanillaPreview";
import HistorialObservaciones from "./components/HistorialObservaciones";

import {
  obtenerObservaciones,
  crearObservacion,
  actualizarObservacion,
  eliminarObservacion as eliminarObservacionDB,
  buscarObservaciones,
} from "./services/observacionesService";

import {
  descargarPDF,
} from "./utils/pdfService";

const observacionInicial = {
  nombreObservador: "",
  fechaObservacion: "",
  fechaEntrega: "",
  firmaProfesor: "",
  firmaTecnicoUrl: "",

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

const BORRADOR_KEY = "borrador_observacion";

function App() {
  const [vista, setVista] = useState("nueva");

  const [formData, setFormData] = useState(() => {
    try {
      const borrador = localStorage.getItem(
        BORRADOR_KEY
      );

      return borrador
        ? {
            ...observacionInicial,
            ...JSON.parse(borrador),
          }
        : {
            ...observacionInicial,
          };
    } catch {
      return {
        ...observacionInicial,
      };
    }
  });

  const [observaciones, setObservaciones] =
    useState([]);

  const [
    observacionEditando,
    setObservacionEditando,
  ] = useState(null);

  const [
    observacionSeleccionada,
    setObservacionSeleccionada,
  ] = useState(null);

  const [
    nombrePlanillaEditando,
    setNombrePlanillaEditando,
  ] = useState("");

  const [busqueda, setBusqueda] =
    useState("");

  const [cargando, setCargando] =
    useState(true);

  // =====================================================
  // BORRADOR LOCAL DE SEGURIDAD
  // =====================================================

  useEffect(() => {
    if (
      vista !== "nueva" &&
      vista !== "editar"
    ) {
      return;
    }

    const hayDatos =
      Object.values(formData).some(
        (valor) =>
          String(valor || "").trim() !== ""
      );

    if (hayDatos) {
      localStorage.setItem(
        BORRADOR_KEY,
        JSON.stringify(formData)
      );
    } else {
      localStorage.removeItem(
        BORRADOR_KEY
      );
    }
  }, [formData, vista]);

  // =====================================================
  // CARGAR OBSERVACIONES
  // =====================================================

  const cargarObservaciones =
    async () => {
      try {
        setCargando(true);

        const data =
          await obtenerObservaciones();

        setObservaciones(
          data || []
        );

        return data || [];
      } catch (error) {
        console.error(
          "Error cargando observaciones:",
          error
        );

        await Swal.fire({
          icon: "error",
          title:
            "No se pudieron cargar las planillas",
          text:
            error?.message ||
            "No se pudo conectar con Supabase.",
        });

        return [];
      } finally {
        setCargando(false);
      }
    };

  useEffect(() => {
    cargarObservaciones();
  }, []);

  // =====================================================
  // NUEVA OBSERVACIÓN
  // =====================================================

  const nuevaObservacion =
    async () => {
      const borradorGuardado =
        localStorage.getItem(
          BORRADOR_KEY
        );

      if (borradorGuardado) {
        let borrador = null;

        try {
          borrador =
            JSON.parse(
              borradorGuardado
            );
        } catch {
          borrador = null;
        }

        if (borrador) {
          const resultado =
            await Swal.fire({
              icon: "question",
              title:
                "Hay una planilla sin terminar",
              text:
                "¿Querés continuarla o empezar una nueva?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText:
                "Continuar",
              denyButtonText:
                "Empezar nueva",
              cancelButtonText:
                "Cancelar",
            });

          if (
            resultado.isConfirmed
          ) {
            setFormData({
              ...observacionInicial,
              ...borrador,
            });

            setVista("nueva");

            setObservacionEditando(
              null
            );

            setObservacionSeleccionada(
              null
            );

            return;
          }

          if (!resultado.isDenied) {
            return;
          }
        }
      }

      localStorage.removeItem(
        BORRADOR_KEY
      );

      setFormData({
        ...observacionInicial,
      });

      setObservacionEditando(null);
      setObservacionSeleccionada(null);
      setNombrePlanillaEditando("");

      setVista("nueva");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  // =====================================================
  // GUARDAR NUEVA PLANILLA
  // =====================================================

  const finalizarObservacion =
    async (datosFinales) => {
      setFormData(
        datosFinales
      );

      localStorage.setItem(
        BORRADOR_KEY,
        JSON.stringify(
          datosFinales
        )
      );

      const resultadoNombre =
        await Swal.fire({
          title:
            "Guardar planilla",

          text:
            "Poné un nombre para encontrarla fácilmente después.",

          input: "text",

          inputValue:
            datosFinales.club || "",

          inputPlaceholder:
            "Ej: Independiente - Categoría 2017",

          showCancelButton: true,

          confirmButtonText:
            "Guardar planilla",

          cancelButtonText:
            "Volver",

          inputValidator:
            (value) => {
              if (!value?.trim()) {
                return "Escribí un nombre para la planilla.";
              }
            },
        });

      if (
        !resultadoNombre.isConfirmed
      ) {
        return;
      }

      const nombrePlanilla =
        resultadoNombre.value.trim();

      try {
        Swal.fire({
          title:
            "Guardando planilla...",

          text:
            "No cierres esta ventana.",

          allowOutsideClick: false,
          allowEscapeKey: false,

          didOpen: () => {
            Swal.showLoading();
          },
        });

        const guardada =
          await crearObservacion(
            nombrePlanilla,
            datosFinales
          );

        if (!guardada?.id) {
          throw new Error(
            "Supabase no confirmó el guardado."
          );
        }

        const actualizadas =
          await obtenerObservaciones();

        setObservaciones(
          actualizadas || []
        );

        localStorage.removeItem(
          BORRADOR_KEY
        );

        setFormData({
          ...observacionInicial,
        });

        setObservacionEditando(
          null
        );

        setObservacionSeleccionada(
          null
        );

        setNombrePlanillaEditando(
          ""
        );

        setVista("historial");

        await Swal.fire({
          icon: "success",
          title:
            "Planilla guardada",
          text: `"${nombrePlanilla}" quedó guardada correctamente.`,
          confirmButtonText:
            "Aceptar",
        });
      } catch (error) {
        console.error(
          "Error guardando:",
          error
        );

        await Swal.fire({
          icon: "error",
          title:
            "No se pudo guardar",

          html: `
            <p>La información no se perdió.</p>
            <p>Quedó guardada como borrador en este dispositivo.</p>
            <p style="font-size:12px;margin-top:12px">
              ${
                error?.message ||
                "Error desconocido"
              }
            </p>
          `,
        });
      }
    };

  // =====================================================
  // DATOS SUPABASE → FORMULARIO
  // =====================================================

  const obtenerDatosFormulario =
    (observacion) => ({
      ...observacionInicial,
      ...(observacion?.datos || {}),
    });

  // =====================================================
  // HISTORIAL
  // =====================================================

  const abrirHistorial =
    async () => {
      await cargarObservaciones();

      setVista("historial");
    };

  // =====================================================
  // VER
  // =====================================================

  const verObservacion =
    (observacion) => {
      setObservacionSeleccionada(
        observacion
      );

      setFormData(
        obtenerDatosFormulario(
          observacion
        )
      );

      setNombrePlanillaEditando(
        observacion.nombre_planilla ||
          ""
      );

      setObservacionEditando(null);

      setVista("ver");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  // =====================================================
  // EDITAR
  // =====================================================

  const editarObservacion =
    (observacion) => {
      const datos =
        obtenerDatosFormulario(
          observacion
        );

      setObservacionSeleccionada(
        observacion
      );

      setFormData(datos);

      setObservacionEditando(
        observacion.id
      );

      setNombrePlanillaEditando(
        observacion.nombre_planilla ||
          ""
      );

      localStorage.setItem(
        BORRADOR_KEY,
        JSON.stringify(datos)
      );

      setVista("editar");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  // =====================================================
  // GUARDAR EDICIÓN
  // =====================================================

  const guardarEdicionDirecta =
    async () => {
      if (!observacionEditando) {
        return;
      }

      try {
        Swal.fire({
          title:
            "Guardando cambios...",

          allowOutsideClick: false,
          allowEscapeKey: false,

          didOpen: () => {
            Swal.showLoading();
          },
        });

        const actualizada =
          await actualizarObservacion(
            observacionEditando,
            nombrePlanillaEditando,
            formData
          );

        if (!actualizada?.id) {
          throw new Error(
            "Supabase no confirmó la actualización."
          );
        }

        const actualizadas =
          await obtenerObservaciones();

        setObservaciones(
          actualizadas || []
        );

        localStorage.removeItem(
          BORRADOR_KEY
        );

        setFormData({
          ...observacionInicial,
        });

        setObservacionEditando(null);
        setObservacionSeleccionada(null);
        setNombrePlanillaEditando("");

        setVista("historial");

        await Swal.fire({
          icon: "success",
          title:
            "Cambios guardados",
          text:
            "La planilla fue actualizada correctamente.",
        });
      } catch (error) {
        console.error(
          "Error actualizando:",
          error
        );

        await Swal.fire({
          icon: "error",
          title:
            "No se pudieron guardar los cambios",
          text:
            error?.message ||
            "La edición quedó guardada como borrador.",
        });
      }
    };

  // =====================================================
  // CANCELAR EDICIÓN
  // =====================================================

  const cancelarEdicion =
    async () => {
      const resultado =
        await Swal.fire({
          icon: "question",

          title:
            "¿Cancelar edición?",

          text:
            "Los cambios sin guardar se perderán.",

          showCancelButton: true,

          confirmButtonText:
            "Sí, cancelar",

          cancelButtonText:
            "Seguir editando",
        });

      if (!resultado.isConfirmed) {
        return;
      }

      localStorage.removeItem(
        BORRADOR_KEY
      );

      setObservacionEditando(null);
      setObservacionSeleccionada(null);
      setNombrePlanillaEditando("");

      setFormData({
        ...observacionInicial,
      });

      setVista("historial");
    };

  // =====================================================
  // ELIMINAR
  // =====================================================

  const eliminarObservacion =
    async (observacion) => {
      const resultado =
        await Swal.fire({
          icon: "warning",

          title:
            "¿Eliminar planilla?",

          text: `"${observacion.nombre_planilla || "Esta planilla"}" se eliminará definitivamente.`,

          showCancelButton: true,

          confirmButtonText:
            "Sí, eliminar",

          cancelButtonText:
            "Cancelar",

          confirmButtonColor:
            "#b42318",
        });

      if (!resultado.isConfirmed) {
        return;
      }

      try {
        Swal.fire({
          title:
            "Eliminando...",

          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
          },
        });

        await eliminarObservacionDB(
          observacion.id
        );

        await cargarObservaciones();

        await Swal.fire({
          icon: "success",
          title:
            "Planilla eliminada",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title:
            "No se pudo eliminar",
          text:
            error?.message,
        });
      }
    };

  // =====================================================
  // BUSCAR
  // =====================================================

  const ejecutarBusqueda =
    async () => {
      try {
        setCargando(true);

        const data =
          await buscarObservaciones(
            busqueda
          );

        setObservaciones(
          data || []
        );
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title:
            "Error al buscar",
          text:
            error?.message,
        });
      } finally {
        setCargando(false);
      }
    };

  const limpiarBusqueda =
    async () => {
      setBusqueda("");

      await cargarObservaciones();
    };

  // =====================================================
  // DESCARGAR PDF
  // =====================================================

  const generarPDF =
    async () => {
      try {
        Swal.fire({
          title:
            "Generando PDF...",

          text:
            "Preparando las dos hojas.",

          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
          },
        });

        await descargarPDF(
          nombrePlanillaEditando ||
            formData.club ||
            "planilla-observacion"
        );

        Swal.close();
      } catch (error) {
        console.error(error);

        await Swal.fire({
          icon: "error",
          title:
            "No se pudo generar el PDF",
          text:
            error?.message ||
            "Ocurrió un error al crear el archivo.",
        });
      }
    };

  // =====================================================
  // PDF DESDE HISTORIAL
  // =====================================================

  const imprimirObservacion =
    (observacion) => {
      const datos =
        obtenerDatosFormulario(
          observacion
        );

      setObservacionSeleccionada(
        observacion
      );

      setFormData(datos);

      setNombrePlanillaEditando(
        observacion.nombre_planilla ||
          ""
      );

      setVista("ver");

      setTimeout(
        async () => {
          try {
            await descargarPDF(
              observacion.nombre_planilla ||
                observacion.club ||
                "planilla-observacion"
            );
          } catch (error) {
            console.error(error);

            await Swal.fire({
              icon: "error",
              title:
                "No se pudo generar el PDF",
              text:
                error?.message,
            });
          }
        },
        500
      );
    };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="app">

      <header className="header no-imprimir">

        <div>

          <h1>
            Observaciones de entrenamiento
          </h1>

          <p>
            Visoría de Licencia C
          </p>

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
            onClick={abrirHistorial}
          >
            Mis observaciones
          </button>

        </nav>

      </header>

      <main>

        {/* NUEVA */}

        {vista === "nueva" && (
          <>

            <div className="no-imprimir">

              <AsistenteObservacion
                formData={formData}
                setFormData={setFormData}
                onFinalizar={
                  finalizarObservacion
                }
              />

              <div className="acciones-planilla">

                <button
                  type="button"
                  className="btn-guardar"
                  onClick={() =>
                    finalizarObservacion(
                      formData
                    )
                  }
                >
                  Guardar esta planilla
                </button>

              </div>

            </div>

            <PlanillaPreview
              formData={formData}
              setFormData={setFormData}
            />

          </>
        )}


        {/* EDITAR */}

        {vista === "editar" && (
          <>

            <div className="barra-edicion no-imprimir">

              <div>

                <strong>
                  {nombrePlanillaEditando}
                </strong>

                <span>
                  Tocá cualquier campo de la planilla para editarlo.
                </span>

              </div>

              <div className="barra-edicion-acciones">

                <button
                  type="button"
                  className="btn-secundario"
                  onClick={
                    cancelarEdicion
                  }
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn-guardar"
                  onClick={
                    guardarEdicionDirecta
                  }
                >
                  Guardar cambios
                </button>

              </div>

            </div>

            <PlanillaPreview
              formData={formData}
              setFormData={setFormData}
              editable={true}
            />

          </>
        )}


        {/* HISTORIAL */}

        {vista === "historial" && (
          <>

            <section className="buscador-observaciones no-imprimir">

              <input
                type="text"

                placeholder="Buscar por nombre, club, observador, técnico o categoría..."

                value={busqueda}

                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }

                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    ejecutarBusqueda();
                  }
                }}
              />

              <button
                type="button"
                onClick={
                  ejecutarBusqueda
                }
              >
                Buscar
              </button>

              {busqueda && (

                <button
                  type="button"
                  className="btn-secundario"
                  onClick={
                    limpiarBusqueda
                  }
                >
                  Limpiar
                </button>

              )}

            </section>

            {cargando ? (

              <div className="estado-carga">
                Cargando planillas...
              </div>

            ) : (

              <HistorialObservaciones
                observaciones={
                  observaciones
                }
                onEditar={
                  editarObservacion
                }
                onEliminar={
                  eliminarObservacion
                }
                onVer={
                  verObservacion
                }
                onPDF={
                  imprimirObservacion
                }
              />

            )}

          </>
        )}


        {/* VER */}

        {vista === "ver" && (
          <>

            <div className="acciones-planilla no-imprimir">

              <button
                type="button"
                className="btn-secundario"
                onClick={
                  abrirHistorial
                }
              >
                ← Volver
              </button>

              {observacionSeleccionada && (

                <button
                  type="button"
                  className="btn-editar"

                  onClick={() =>
                    editarObservacion(
                      observacionSeleccionada
                    )
                  }
                >
                  Editar
                </button>

              )}

              <button
                type="button"
                className="btn-pdf"
                onClick={generarPDF}
              >
                Descargar PDF
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