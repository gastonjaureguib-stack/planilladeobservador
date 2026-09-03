import Swal from "sweetalert2";

function HistorialObservaciones({
  observaciones,
  onEditar,
  onEliminar,
  onVer,
}) {
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";

    const [anio, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const confirmarEliminar = async (observacion) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar observación?",
      text: `${observacion.club || "Esta observación"} se eliminará definitivamente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b42318",
    });

    if (resultado.isConfirmed) {
      onEliminar(observacion.id);
    }
  };

  if (observaciones.length === 0) {
    return (
      <section className="historial">
        <h2>Mis observaciones</h2>

        <div className="historial-vacio">
          <h3>Todavía no hay observaciones</h3>
          <p>
            Cuando completes una planilla aparecerá guardada acá.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="historial">
      <div className="historial-titulo">
        <div>
          <h2>Mis observaciones</h2>
          <p>
            {observaciones.length}{" "}
            {observaciones.length === 1
              ? "observación guardada"
              : "observaciones guardadas"}
          </p>
        </div>
      </div>

      <div className="lista-observaciones">
        {observaciones.map((observacion) => (
          <article
            className="observacion-card"
            key={observacion.id}
          >
            <div className="observacion-info">
              <span className="observacion-fecha">
                {formatearFecha(observacion.fechaObservacion)}
              </span>

              <h3>
                {observacion.club || "Club sin especificar"}
              </h3>

              <p>
                {observacion.categoria || "Categoría sin especificar"}
              </p>

              {observacion.tecnicoNombre && (
                <small>
                  Técnico: {observacion.tecnicoNombre}
                </small>
              )}
            </div>

            <div className="acciones-observacion">
              <button
                type="button"
                className="btn-secundario"
                onClick={() => onVer(observacion)}
              >
                Ver
              </button>

              <button
                type="button"
                className="btn-editar"
                onClick={() => onEditar(observacion)}
              >
                Editar
              </button>

              <button
                type="button"
                className="btn-eliminar"
                onClick={() => confirmarEliminar(observacion)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HistorialObservaciones;