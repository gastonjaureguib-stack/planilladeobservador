function HistorialObservaciones({
  observaciones,
  onEditar,
  onEliminar,
  onVer,
  onPDF,
}) {
  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "Sin fecha";
    }

    const [anio, mes, dia] =
      fecha.split("-");

    return `${dia}/${mes}/${anio}`;
  };

  if (observaciones.length === 0) {
    return (
      <section className="historial">

        <h2>
          Mis observaciones
        </h2>

        <div className="historial-vacio">

          <h3>
            Todavía no hay planillas guardadas
          </h3>

          <p>
            Cuando guardes una observación aparecerá acá.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="historial">

      <div className="historial-titulo">

        <h2>
          Mis observaciones
        </h2>

        <p>
          {observaciones.length}{" "}
          {observaciones.length === 1
            ? "planilla guardada"
            : "planillas guardadas"}
        </p>

      </div>

      <div className="lista-observaciones">

        {observaciones.map(
          (observacion) => (

            <article
              className="observacion-card"
              key={observacion.id}
            >

              <div className="observacion-info">

                <span className="observacion-fecha">
                  {formatearFecha(
                    observacion.fecha_observacion
                  )}
                </span>

                <h3>
                  {observacion.nombre_planilla ||
                    "Planilla sin nombre"}
                </h3>

                <p>
                  {observacion.club ||
                    "Club sin especificar"}

                  {observacion.categoria
                    ? ` · ${observacion.categoria}`
                    : ""}
                </p>

                <small>
                  Observador:{" "}
                  {observacion.nombre_observador ||
                    "Sin especificar"}
                </small>

              </div>

              <div className="acciones-observacion">

                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() =>
                    onVer(observacion)
                  }
                >
                  Ver
                </button>

                <button
                  type="button"
                  className="btn-editar"
                  onClick={() =>
                    onEditar(observacion)
                  }
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn-pdf"
                  onClick={() =>
                    onPDF(observacion)
                  }
                >
                  PDF
                </button>

                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() =>
                    onEliminar(observacion)
                  }
                >
                  Eliminar
                </button>

              </div>

            </article>

          )
        )}

      </div>

    </section>
  );
}

export default HistorialObservaciones;