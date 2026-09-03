import Swal from "sweetalert2";

function AsistenteObservacion({ formData, setFormData }) {

  const escapar = (valor = "") => {
    return String(valor)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  };

  const iniciarAsistente = async () => {

    // =====================================
    // PASO 1 - DATOS DE LA OBSERVACIÓN
    // =====================================

    const paso1 = await Swal.fire({
      title: "Datos de la observación",
      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 1 de 7
          </p>

          <label>
            Nombre del alumno observador
            <input
              id="nombreObservador"
              class="swal2-input"
              value="${escapar(formData.nombreObservador)}"
            >
          </label>

          <label>
            Fecha de observación
            <input
              id="fechaObservacion"
              type="date"
              class="swal2-input"
              value="${escapar(formData.fechaObservacion)}"
            >
          </label>

          <label>
            Fecha de entrega
            <input
              id="fechaEntrega"
              type="date"
              class="swal2-input"
              value="${escapar(formData.fechaEntrega)}"
            >
          </label>

        </div>
      `,

      confirmButtonText: "Continuar →",
      showCancelButton: true,
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          nombreObservador:
            document.getElementById("nombreObservador").value,

          fechaObservacion:
            document.getElementById("fechaObservacion").value,

          fechaEntrega:
            document.getElementById("fechaEntrega").value,
        };
      },
    });

    if (!paso1.isConfirmed) return;

    const datos1 = paso1.value;

    setFormData((prev) => ({
      ...prev,
      ...datos1,
    }));


    // =====================================
    // PASO 2 - DATOS GENERALES
    // =====================================

    const paso2 = await Swal.fire({
      title: "Datos generales",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 2 de 7
          </p>

          <label>
            Club observado
            <input
              id="club"
              class="swal2-input"
              value="${escapar(formData.club)}"
            >
          </label>

          <label>
            Categoría / edades
            <input
              id="categoria"
              class="swal2-input"
              value="${escapar(formData.categoria)}"
            >
          </label>

          <label>
            Jugadores presentes
            <input
              id="jugadoresPresentes"
              type="number"
              class="swal2-input"
              value="${escapar(formData.jugadoresPresentes)}"
            >
          </label>

          <label>
            Prácticas semanales
            <input
              id="practicasSemanales"
              type="number"
              class="swal2-input"
              value="${escapar(formData.practicasSemanales)}"
            >
          </label>

        </div>
      `,

      confirmButtonText: "Continuar →",

      preConfirm: () => ({
        club:
          document.getElementById("club").value,

        categoria:
          document.getElementById("categoria").value,

        jugadoresPresentes:
          document.getElementById("jugadoresPresentes").value,

        practicasSemanales:
          document.getElementById("practicasSemanales").value,
      }),
    });

    if (!paso2.isConfirmed) return;

    const datos2 = paso2.value;

    setFormData((prev) => ({
      ...prev,
      ...datos2,
    }));


    // =====================================
    // PASO 3 - EL TÉCNICO
    // =====================================

    const paso3 = await Swal.fire({
      title: "El técnico",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 3 de 7
          </p>

          <label>
            Nombre del técnico
            <input
              id="tecnicoNombre"
              class="swal2-input"
              value="${escapar(formData.tecnicoNombre)}"
            >
          </label>

          <label>
            Experiencia como jugador
            <textarea
              id="experienciaJugador"
              class="swal2-textarea"
            >${escapar(formData.experienciaJugador)}</textarea>
          </label>

          <label>
            Capacitación como entrenador
            <textarea
              id="capacitacionEntrenador"
              class="swal2-textarea"
            >${escapar(formData.capacitacionEntrenador)}</textarea>
          </label>

          <label>
            ¿Entrena con un equipo deportivo?

            <select
              id="entrenaEquipo"
              class="swal2-select"
            >
              <option value="">Seleccionar</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </label>

        </div>
      `,

      confirmButtonText: "Continuar →",

      didOpen: () => {
        document.getElementById("entrenaEquipo").value =
          formData.entrenaEquipo || "";
      },

      preConfirm: () => ({
        tecnicoNombre:
          document.getElementById("tecnicoNombre").value,

        experienciaJugador:
          document.getElementById("experienciaJugador").value,

        capacitacionEntrenador:
          document.getElementById("capacitacionEntrenador").value,

        entrenaEquipo:
          document.getElementById("entrenaEquipo").value,
      }),
    });

    if (!paso3.isConfirmed) return;

    setFormData((prev) => ({
      ...prev,
      ...paso3.value,
    }));


    // =====================================
    // TERMINAMOS LA PRIMERA PARTE
    // =====================================

    await Swal.fire({
      icon: "success",
      title: "Primera parte completa",
      text: "Los datos ya fueron cargados en la planilla.",
      confirmButtonText: "Ver planilla",
    });
  };


  return (
    <div className="inicio-asistente">

      <img
        src="/logoplanilla.png"
        alt="Logo"
        className="logo-asistente"
      />

      <h2>Nueva observación</h2>

      <p>
        Completá los datos paso a paso y la aplicación
        preparará automáticamente la planilla.
      </p>

      <button
        type="button"
        className="btn-comenzar"
        onClick={iniciarAsistente}
      >
        Comenzar observación
      </button>

    </div>
  );
}

export default AsistenteObservacion;