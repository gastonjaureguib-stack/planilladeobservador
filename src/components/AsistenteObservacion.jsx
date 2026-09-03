import Swal from "sweetalert2";

function AsistenteObservacion({ formData, setFormData }) {
  // Evita problemas al colocar valores escritos dentro del HTML de SweetAlert
  const escapar = (valor = "") => {
    return String(valor)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  };

  // Lee un input del SweetAlert
  const valor = (id) => {
    return document.getElementById(id)?.value || "";
  };

  // Guarda cada paso también en React
  const guardarPaso = (datos) => {
    setFormData((prev) => ({
      ...prev,
      ...datos,
    }));
  };

  // HTML reutilizable para los Sí / No
  const selectSiNo = (id, label, seleccionado = "") => {
    return `
      <label>
        ${label}

        <select
          id="${id}"
          class="swal2-select"
        >
          <option value="" ${seleccionado === "" ? "selected" : ""}>
            Seleccionar
          </option>

          <option value="Sí" ${seleccionado === "Sí" ? "selected" : ""}>
            Sí
          </option>

          <option value="No" ${seleccionado === "No" ? "selected" : ""}>
            No
          </option>
        </select>
      </label>
    `;
  };

  const iniciarAsistente = async () => {
    /*
      Creamos una copia local.

      Esto es importante porque setFormData actualiza React,
      pero nosotros queremos que los pasos siguientes tengan
      inmediatamente los valores anteriores.
    */
    let datos = { ...formData };

    // =====================================================
    // PASO 1
    // DATOS DE LA OBSERVACIÓN
    // =====================================================

    const paso1 = await Swal.fire({
      title: "Datos de la observación",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 1 de 8
          </p>

          <label>
            Nombre del alumno observador

            <input
              id="nombreObservador"
              class="swal2-input"
              value="${escapar(datos.nombreObservador)}"
            >
          </label>

          <label>
            Fecha de observación

            <input
              id="fechaObservacion"
              type="date"
              class="swal2-input"
              value="${escapar(datos.fechaObservacion)}"
            >
          </label>

          <label>
            Fecha de entrega

            <input
              id="fechaEntrega"
              type="date"
              class="swal2-input"
              value="${escapar(datos.fechaEntrega)}"
            >
          </label>

          <label>
            Firma y aclaración del profesor

            <input
              id="firmaProfesor"
              class="swal2-input"
              value="${escapar(datos.firmaProfesor)}"
            >
          </label>

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          nombreObservador: valor("nombreObservador"),
          fechaObservacion: valor("fechaObservacion"),
          fechaEntrega: valor("fechaEntrega"),
          firmaProfesor: valor("firmaProfesor"),
        };
      },
    });

    if (!paso1.isConfirmed) return;

    datos = {
      ...datos,
      ...paso1.value,
    };

    guardarPaso(paso1.value);

    // =====================================================
    // PASO 2
    // DATOS GENERALES
    // =====================================================

    const paso2 = await Swal.fire({
      title: "Datos generales",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 2 de 8
          </p>

          <label>
            Nombre del club observado

            <input
              id="club"
              class="swal2-input"
              value="${escapar(datos.club)}"
            >
          </label>

          <label>
            Categoría / edades de los jugadores

            <input
              id="categoria"
              class="swal2-input"
              value="${escapar(datos.categoria)}"
            >
          </label>

          <label>
            Número de jugadores presentes

            <input
              id="jugadoresPresentes"
              type="number"
              min="0"
              class="swal2-input"
              value="${escapar(datos.jugadoresPresentes)}"
            >
          </label>

          <label>
            Número de prácticas semanales

            <input
              id="practicasSemanales"
              type="number"
              min="0"
              class="swal2-input"
              value="${escapar(datos.practicasSemanales)}"
            >
          </label>

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          club: valor("club"),
          categoria: valor("categoria"),
          jugadoresPresentes: valor("jugadoresPresentes"),
          practicasSemanales: valor("practicasSemanales"),
        };
      },
    });

    if (!paso2.isConfirmed) return;

    datos = {
      ...datos,
      ...paso2.value,
    };

    guardarPaso(paso2.value);

    // =====================================================
    // PASO 3
    // EL TÉCNICO
    // =====================================================

    const paso3 = await Swal.fire({
      title: "El técnico",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 3 de 8
          </p>

          <label>
            Nombre del técnico

            <input
              id="tecnicoNombre"
              class="swal2-input"
              value="${escapar(datos.tecnicoNombre)}"
            >
          </label>

          <label>
            Experiencia como jugador

            <textarea
              id="experienciaJugador"
              class="swal2-textarea"
            >${escapar(datos.experienciaJugador)}</textarea>
          </label>

          <label>
            Capacitación como entrenador

            <textarea
              id="capacitacionEntrenador"
              class="swal2-textarea"
            >${escapar(datos.capacitacionEntrenador)}</textarea>
          </label>

          ${selectSiNo(
            "entrenaEquipo",
            "¿Entrena con un equipo deportivo?",
            datos.entrenaEquipo
          )}

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          tecnicoNombre: valor("tecnicoNombre"),
          experienciaJugador: valor("experienciaJugador"),
          capacitacionEntrenador: valor("capacitacionEntrenador"),
          entrenaEquipo: valor("entrenaEquipo"),
        };
      },
    });

    if (!paso3.isConfirmed) return;

    datos = {
      ...datos,
      ...paso3.value,
    };

    guardarPaso(paso3.value);

    // =====================================================
    // PASO 4
    // LA PRÁCTICA
    // =====================================================

    const paso4 = await Swal.fire({
      title: "La práctica",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 4 de 8
          </p>

          ${selectSiNo(
            "estructuraSesion",
            "¿Existe una estructura de la sesión?",
            datos.estructuraSesion
          )}

          ${selectSiNo(
            "tomaGrupo",
            "Toma del grupo",
            datos.tomaGrupo
          )}

          ${selectSiNo(
            "presentacionTrabajo",
            "Presentación del trabajo",
            datos.presentacionTrabajo
          )}

          ${selectSiNo(
            "calentamiento",
            "Calentamiento",
            datos.calentamiento
          )}

          ${selectSiNo(
            "partePrincipal",
            "Parte principal",
            datos.partePrincipal
          )}

          ${selectSiNo(
            "aprendizajeJuego",
            "Parte aprendizaje del juego",
            datos.aprendizajeJuego
          )}

          ${selectSiNo(
            "evaluacionJugadores",
            "Evaluación de la sesión con los jugadores",
            datos.evaluacionJugadores
          )}

          <label>
            Tiempo total de la sesión en minutos

            <input
              id="tiempoSesion"
              type="number"
              min="0"
              class="swal2-input"
              value="${escapar(datos.tiempoSesion)}"
            >
          </label>

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      width: 650,

      preConfirm: () => {
        return {
          estructuraSesion: valor("estructuraSesion"),
          tomaGrupo: valor("tomaGrupo"),
          presentacionTrabajo: valor("presentacionTrabajo"),
          calentamiento: valor("calentamiento"),
          partePrincipal: valor("partePrincipal"),
          aprendizajeJuego: valor("aprendizajeJuego"),
          evaluacionJugadores: valor("evaluacionJugadores"),
          tiempoSesion: valor("tiempoSesion"),
        };
      },
    });

    if (!paso4.isConfirmed) return;

    datos = {
      ...datos,
      ...paso4.value,
    };

    guardarPaso(paso4.value);

    // =====================================================
    // PASO 5
    // MATERIAL E INFRAESTRUCTURA
    // =====================================================

    const paso5 = await Swal.fire({
      title: "Material e infraestructura",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 5 de 8
          </p>

          <label>
            Espacio disponible

            <input
              id="espacioDisponible"
              class="swal2-input"
              value="${escapar(datos.espacioDisponible)}"
            >
          </label>

          <label>
            Material disponible

            <textarea
              id="materialDisponible"
              class="swal2-textarea"
              placeholder="Ej: conos, pelotas, tapitas..."
            >${escapar(datos.materialDisponible)}</textarea>
          </label>

          ${selectSiNo(
            "actitudPedagogica",
            "Actitud pedagógica",
            datos.actitudPedagogica
          )}

          ${selectSiNo(
            "presentacion",
            "Presentación",
            datos.presentacion
          )}

          ${selectSiNo(
            "demostracion",
            "Demostración",
            datos.demostracion
          )}

          ${selectSiNo(
            "consignasCorrectas",
            "Consignas correctas",
            datos.consignasCorrectas
          )}

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          espacioDisponible: valor("espacioDisponible"),
          materialDisponible: valor("materialDisponible"),
          actitudPedagogica: valor("actitudPedagogica"),
          presentacion: valor("presentacion"),
          demostracion: valor("demostracion"),
          consignasCorrectas: valor("consignasCorrectas"),
        };
      },
    });

    if (!paso5.isConfirmed) return;

    datos = {
      ...datos,
      ...paso5.value,
    };

    guardarPaso(paso5.value);

    // =====================================================
    // PASO 6
    // SESIÓN + CLIMA DE APRENDIZAJE
    // =====================================================

    const paso6 = await Swal.fire({
      title: "Sesión y clima de aprendizaje",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 6 de 8
          </p>

          ${selectSiNo(
            "alcancesSesion",
            "¿El técnico propone los alcances?",
            datos.alcancesSesion
          )}

          ${selectSiNo(
            "planificacionCortoLargoPlazo",
            "¿Existe una planificación a corto o largo plazo?",
            datos.planificacionCortoLargoPlazo
          )}

          <label>
            Comportamiento del educador

            <textarea
              id="comportamientoEducador"
              class="swal2-textarea"
            >${escapar(datos.comportamientoEducador)}</textarea>
          </label>

          <label>
            Participación de los niños

            <textarea
              id="participacionNinos"
              class="swal2-textarea"
            >${escapar(datos.participacionNinos)}</textarea>
          </label>

          ${selectSiNo(
            "recoleccionMaterial",
            "¿Los niños participan en la recolección del material?",
            datos.recoleccionMaterial
          )}

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          alcancesSesion: valor("alcancesSesion"),
          planificacionCortoLargoPlazo:
            valor("planificacionCortoLargoPlazo"),
          comportamientoEducador:
            valor("comportamientoEducador"),
          participacionNinos:
            valor("participacionNinos"),
          recoleccionMaterial:
            valor("recoleccionMaterial"),
        };
      },
    });

    if (!paso6.isConfirmed) return;

    datos = {
      ...datos,
      ...paso6.value,
    };

    guardarPaso(paso6.value);

    // =====================================================
    // PASO 7
    // EVALUACIÓN
    // =====================================================

    const paso7 = await Swal.fire({
      title: "Evaluación del entrenamiento",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 7 de 8
          </p>

          <label>
            Puntos positivos

            <textarea
              id="puntosPositivos"
              class="swal2-textarea"
              placeholder="Describí los aspectos positivos observados"
            >${escapar(datos.puntosPositivos)}</textarea>
          </label>

          <label>
            Puntos a mejorar

            <textarea
              id="puntosMejorar"
              class="swal2-textarea"
              placeholder="Describí los aspectos que podrían mejorar"
            >${escapar(datos.puntosMejorar)}</textarea>
          </label>

          ${selectSiNo(
            "sesionAdaptada",
            "¿La sesión está adaptada al nivel y a la edad de los niños?",
            datos.sesionAdaptada
          )}

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Continuar →",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          puntosPositivos: valor("puntosPositivos"),
          puntosMejorar: valor("puntosMejorar"),
          sesionAdaptada: valor("sesionAdaptada"),
        };
      },
    });

    if (!paso7.isConfirmed) return;

    datos = {
      ...datos,
      ...paso7.value,
    };

    guardarPaso(paso7.value);

    // =====================================================
    // PASO 8
    // SEGUNDA HOJA
    // =====================================================

    const paso8 = await Swal.fire({
      title: "Segunda hoja",

      html: `
        <div class="swal-form">

          <p class="swal-paso">
            Paso 8 de 8
          </p>

          <label>
            Otros datos de la sesión

            <textarea
              id="otrosDatos"
              class="swal2-textarea"
              placeholder="Agregá cualquier observación adicional"
            >${escapar(datos.otrosDatos)}</textarea>
          </label>

          <label>
            Planificación gráfica / descripción

            <textarea
              id="planificacionGrafica"
              class="swal2-textarea"
              placeholder="Describí la planificación o ejercicio realizado"
            >${escapar(datos.planificacionGrafica)}</textarea>
          </label>

        </div>
      `,

      showCancelButton: true,
      confirmButtonText: "Finalizar ✓",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          otrosDatos: valor("otrosDatos"),
          planificacionGrafica: valor("planificacionGrafica"),
        };
      },
    });

    if (!paso8.isConfirmed) return;

    datos = {
      ...datos,
      ...paso8.value,
    };

    guardarPaso(paso8.value);

    // =====================================================
    // FINAL
    // =====================================================

    await Swal.fire({
      icon: "success",
      title: "¡Observación completa!",
      html: `
        <div style="text-align:center">
          <p>
            Completaste todos los datos de la observación.
          </p>

          <p style="color:#777;font-size:14px">
            La planilla ya está preparada para revisar.
          </p>
        </div>
      `,
      confirmButtonText: "Ver planilla",
    });

    /*
      Buscamos la preview y bajamos automáticamente
      hasta ella.
    */
    setTimeout(() => {
      const preview = document.querySelector(".zona-preview");

      if (preview) {
        preview.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  return (
    <div className="inicio-asistente">
      <img
        src="/logosplanilla.png"
        alt="Logo de la planilla"
        className="logo-asistente"
      />

      <h2>Nueva observación</h2>

      <p>
        Completá la observación paso a paso. Al finalizar podrás
        revisar la planilla completa antes de guardarla.
      </p>

      <div className="info-asistente">
        <span>8 pasos</span>
        <span>•</span>
        <span>Podés revisar antes de guardar</span>
      </div>

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