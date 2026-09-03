function FormularioObservacion({ formData, setFormData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Observación:");
    console.log(formData);
  };

  const campoSiNo = (name, label) => (
    <label>
      {label}

      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="">Seleccionar</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>
    </label>
  );

  return (
    <form
      className="formulario"
      onSubmit={handleSubmit}
    >

      <div className="encabezado-formulario">
        <img
          src="/logoplanilla.png"
          alt="Logo de la planilla"
          className="logo-planilla"
        />

        <h2>Visoría de Licencia C</h2>
        <h3>Asignatura Técnico - Táctico</h3>
      </div>

      <section>
        <h2>Observación de entrenamiento</h2>

        <label>
          Nombre del alumno observador

          <input
            type="text"
            name="nombreObservador"
            value={formData.nombreObservador}
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha de observación

          <input
            type="date"
            name="fechaObservacion"
            value={formData.fechaObservacion}
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha de entrega

          <input
            type="date"
            name="fechaEntrega"
            value={formData.fechaEntrega}
            onChange={handleChange}
          />
        </label>

        <label>
          Firma y aclaración del profesor

          <input
            type="text"
            name="firmaProfesor"
            value={formData.firmaProfesor}
            onChange={handleChange}
          />
        </label>
      </section>

      <section>
        <h2>Datos generales</h2>

        <label>
          Nombre del club observado

          <input
            type="text"
            name="club"
            value={formData.club}
            onChange={handleChange}
          />
        </label>

        <label>
          Categoría / edades de los jugadores

          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
        </label>

        <label>
          Número de jugadores presentes

          <input
            type="number"
            name="jugadoresPresentes"
            value={formData.jugadoresPresentes}
            onChange={handleChange}
          />
        </label>

        <label>
          Número de prácticas semanales

          <input
            type="number"
            name="practicasSemanales"
            value={formData.practicasSemanales}
            onChange={handleChange}
          />
        </label>
      </section>

      <section>
        <h2>El técnico</h2>

        <label>
          Nombre

          <input
            type="text"
            name="tecnicoNombre"
            value={formData.tecnicoNombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Experiencia como jugador

          <textarea
            name="experienciaJugador"
            value={formData.experienciaJugador}
            onChange={handleChange}
          />
        </label>

        <label>
          Capacitación como entrenador

          <textarea
            name="capacitacionEntrenador"
            value={formData.capacitacionEntrenador}
            onChange={handleChange}
          />
        </label>

        {campoSiNo(
          "entrenaEquipo",
          "¿Entrena con un equipo deportivo?"
        )}
      </section>

      <section>
        <h2>La práctica</h2>

        {campoSiNo(
          "estructuraSesion",
          "¿Existe una estructura de la sesión?"
        )}

        {campoSiNo(
          "tomaGrupo",
          "Toma del grupo"
        )}

        {campoSiNo(
          "presentacionTrabajo",
          "Presentación del trabajo"
        )}

        {campoSiNo(
          "calentamiento",
          "Calentamiento"
        )}

        {campoSiNo(
          "partePrincipal",
          "Parte principal"
        )}

        {campoSiNo(
          "aprendizajeJuego",
          "Parte aprendizaje del juego"
        )}

        {campoSiNo(
          "evaluacionJugadores",
          "Evaluación de la sesión con los jugadores"
        )}

        <label>
          Tiempo total de la sesión en minutos

          <input
            type="number"
            name="tiempoSesion"
            value={formData.tiempoSesion}
            onChange={handleChange}
          />
        </label>
      </section>

      <section>
        <h2>Material e infraestructura</h2>

        <label>
          Espacio disponible

          <input
            type="text"
            name="espacioDisponible"
            value={formData.espacioDisponible}
            onChange={handleChange}
          />
        </label>

        <label>
          Material disponible

          <textarea
            name="materialDisponible"
            value={formData.materialDisponible}
            onChange={handleChange}
            placeholder="Ej: conos, pelotas, tapitas..."
          />
        </label>

        {campoSiNo(
          "actitudPedagogica",
          "Actitud pedagógica"
        )}

        {campoSiNo(
          "presentacion",
          "Presentación"
        )}

        {campoSiNo(
          "demostracion",
          "Demostración"
        )}

        {campoSiNo(
          "consignasCorrectas",
          "Consignas correctas"
        )}
      </section>

      <section>
        <h2>La sesión</h2>

        {campoSiNo(
          "alcancesSesion",
          "¿El técnico propone los alcances?"
        )}

        {campoSiNo(
          "planificacionCortoLargoPlazo",
          "¿Existe una planificación a corto o largo plazo?"
        )}
      </section>

      <section>
        <h2>Clima de aprendizaje</h2>

        <label>
          Comportamiento del educador

          <textarea
            name="comportamientoEducador"
            value={formData.comportamientoEducador}
            onChange={handleChange}
          />
        </label>

        <label>
          Participación de los niños

          <textarea
            name="participacionNinos"
            value={formData.participacionNinos}
            onChange={handleChange}
          />
        </label>
      </section>

      <section>
        <h2>Final de la sesión</h2>

        {campoSiNo(
          "recoleccionMaterial",
          "Recolección del material por los niños"
        )}
      </section>

      <section>
        <h2>Evaluación del entrenamiento</h2>

        <label>
          Puntos positivos

          <textarea
            name="puntosPositivos"
            value={formData.puntosPositivos}
            onChange={handleChange}
          />
        </label>

        <label>
          Puntos a mejorar

          <textarea
            name="puntosMejorar"
            value={formData.puntosMejorar}
            onChange={handleChange}
          />
        </label>

        {campoSiNo(
          "sesionAdaptada",
          "¿La sesión está adaptada al nivel y a la edad de los niños?"
        )}
      </section>

      <section>
        <h2>Segunda hoja</h2>

        <label>
          Otros datos de la sesión

          <textarea
            name="otrosDatos"
            value={formData.otrosDatos}
            onChange={handleChange}
          />
        </label>

        <label>
          Planificación gráfica / descripción

          <textarea
            name="planificacionGrafica"
            value={formData.planificacionGrafica}
            onChange={handleChange}
          />
        </label>
      </section>

      <button type="submit">
        Guardar observación
      </button>

    </form>
  );
}

export default FormularioObservacion;