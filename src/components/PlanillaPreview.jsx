function PlanillaPreview({ formData }) {

  const mostrar = (valor) => {
    return valor || "";
  };

  const fecha = (valor) => {
    if (!valor) return "";

    const [anio, mes, dia] = valor.split("-");

    return `${dia}/${mes}/${anio}`;
  };

  const Fila = ({ titulo, valor }) => (
    <div className="fila-planilla">
      <div className="celda-planilla titulo-celda">
        {titulo}
      </div>

      <div className="celda-planilla valor-celda">
        {mostrar(valor)}
      </div>
    </div>
  );

  const TituloSeccion = ({ children }) => (
    <div className="titulo-seccion-planilla">
      {children}
    </div>
  );

  return (
    <div className="zona-preview">

      <h2>Vista previa de la planilla</h2>

      {/* HOJA 1 */}
      <div className="hoja-planilla">

        <div className="cabecera-documento">

          <img
            src="/logoplanilla.png"
            alt="Logo"
            className="logo-documento"
          />

          <div className="texto-cabecera">
            <div>VISORÍA DE LICENCIA C</div>

            <strong>
              ASIGNATURA TÉCNICO - TÁCTICO
            </strong>
          </div>

        </div>

        <TituloSeccion>
          1. OBSERVACIÓN DE ENTRENAMIENTO
        </TituloSeccion>

        <Fila
          titulo="1. NOMBRE DEL ALUMNO OBSERVADOR:"
          valor={formData.nombreObservador}
        />

        <Fila
          titulo="2. FECHA DE OBSERVACIÓN:"
          valor={fecha(formData.fechaObservacion)}
        />

        <Fila
          titulo="3. FECHA DE ENTREGA DE LA VISORÍA:"
          valor={fecha(formData.fechaEntrega)}
        />

        <Fila
          titulo="4. FIRMA Y ACLARACIÓN DEL PROFESOR:"
          valor={formData.firmaProfesor}
        />

        <TituloSeccion>
          2. DATOS GENERALES
        </TituloSeccion>

        <Fila
          titulo="NOMBRE DEL CLUB OBSERVADO:"
          valor={formData.club}
        />

        <Fila
          titulo="CATEGORÍA / EDADES DE LOS JUGADORES:"
          valor={formData.categoria}
        />

        <Fila
          titulo="NÚMERO DE JUGADORES PRESENTES:"
          valor={formData.jugadoresPresentes}
        />

        <Fila
          titulo="NÚMERO DE PRÁCTICAS SEMANALES:"
          valor={formData.practicasSemanales}
        />

        <TituloSeccion>
          3. EL TÉCNICO
        </TituloSeccion>

        <Fila
          titulo="NOMBRE:"
          valor={formData.tecnicoNombre}
        />

        <Fila
          titulo="EXPERIENCIA DE JUGADOR:"
          valor={formData.experienciaJugador}
        />

        <Fila
          titulo="CAPACITACIÓN COMO ENTRENADOR:"
          valor={formData.capacitacionEntrenador}
        />

        <Fila
          titulo="¿ENTRENA CON UN EQUIPO DEPORTIVO?"
          valor={formData.entrenaEquipo}
        />

        <TituloSeccion>
          4. LA PRÁCTICA
        </TituloSeccion>

        <Fila
          titulo="¿EXISTE UNA ESTRUCTURA DE LA SESIÓN?"
          valor={formData.estructuraSesion}
        />

        <Fila
          titulo="TOMA DEL GRUPO:"
          valor={formData.tomaGrupo}
        />

        <Fila
          titulo="PRESENTACIÓN DEL TRABAJO:"
          valor={formData.presentacionTrabajo}
        />

        <Fila
          titulo="CALENTAMIENTO:"
          valor={formData.calentamiento}
        />

        <Fila
          titulo="PARTE PRINCIPAL:"
          valor={formData.partePrincipal}
        />

        <Fila
          titulo="PARTE APRENDIZAJE DEL JUEGO:"
          valor={formData.aprendizajeJuego}
        />

        <Fila
          titulo="EVALUACIÓN DE LA SESIÓN CON LOS JUGADORES:"
          valor={formData.evaluacionJugadores}
        />

        <Fila
          titulo="TIEMPO TOTAL DE LA SESIÓN:"
          valor={
            formData.tiempoSesion
              ? `${formData.tiempoSesion} minutos`
              : ""
          }
        />

        <TituloSeccion>
          5. MATERIAL / INFRAESTRUCTURA
        </TituloSeccion>

        <Fila
          titulo="ESPACIO DISPONIBLE:"
          valor={formData.espacioDisponible}
        />

        <Fila
          titulo="MATERIAL DISPONIBLE:"
          valor={formData.materialDisponible}
        />

        <Fila
          titulo="ACTITUD PEDAGÓGICA:"
          valor={formData.actitudPedagogica}
        />

        <Fila
          titulo="PRESENTACIÓN:"
          valor={formData.presentacion}
        />

        <Fila
          titulo="DEMOSTRACIÓN:"
          valor={formData.demostracion}
        />

        <Fila
          titulo="CONSIGNAS CORRECTAS:"
          valor={formData.consignasCorrectas}
        />

        <TituloSeccion>
          6. LA SESIÓN
        </TituloSeccion>

        <Fila
          titulo="¿EL TÉCNICO PROPONE LOS ALCANCES?"
          valor={formData.alcancesSesion}
        />

        <Fila
          titulo="¿EXISTE UNA PLANIFICACIÓN A CORTO O LARGO PLAZO?"
          valor={formData.planificacionCortoLargoPlazo}
        />

        <TituloSeccion>
          7. CLIMA DE APRENDIZAJE
        </TituloSeccion>

        <Fila
          titulo="COMPORTAMIENTO DEL EDUCADOR:"
          valor={formData.comportamientoEducador}
        />

        <Fila
          titulo="PARTICIPACIÓN DE LOS NIÑOS:"
          valor={formData.participacionNinos}
        />

        <TituloSeccion>
          8. AL FINAL DE LA SESIÓN
        </TituloSeccion>

        <Fila
          titulo="RECOLECCIÓN DEL MATERIAL POR LOS NIÑOS:"
          valor={formData.recoleccionMaterial}
        />

        <TituloSeccion>
          9. EVALUACIÓN DEL ENTRENAMIENTO
        </TituloSeccion>

        <Fila
          titulo="PUNTOS POSITIVOS:"
          valor={formData.puntosPositivos}
        />

        <Fila
          titulo="PUNTOS A MEJORAR:"
          valor={formData.puntosMejorar}
        />

        <Fila
          titulo="SESIÓN ADAPTADA AL NIVEL Y A LA EDAD DE LOS NIÑOS:"
          valor={formData.sesionAdaptada}
        />

      </div>


      {/* HOJA 2 */}
      <div className="hoja-planilla segunda-hoja">

        <div className="cabecera-documento">

          <img
            src="/logoplanilla.png"
            alt="Logo"
            className="logo-documento"
          />

          <div className="texto-cabecera">
            <div>VISORÍA DE LICENCIA C</div>

            <strong>
              ASIGNATURA TÉCNICO - TÁCTICO
            </strong>
          </div>

        </div>

        <TituloSeccion>
          OTROS DATOS DE LA SESIÓN
        </TituloSeccion>

        <div className="campo-grande-planilla">
          {mostrar(formData.otrosDatos)}
        </div>

        <TituloSeccion>
          PLANIFICACIÓN GRÁFICA
        </TituloSeccion>

        <div className="campo-grafico-planilla">
          {mostrar(formData.planificacionGrafica)}
        </div>

      </div>

    </div>
  );
}

export default PlanillaPreview;