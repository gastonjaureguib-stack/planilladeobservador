import Swal from "sweetalert2";
import { subirFirmaTecnico } from "../services/firmasService";

function PlanillaPreview({
  formData,
  setFormData,
  editable = false,
}) {
  const mostrar = (valor) => {
    return valor || "";
  };

  const fecha = (valor) => {
    if (!valor) return "";

    const [anio, mes, dia] = valor.split("-");

    return `${dia}/${mes}/${anio}`;
  };

  // =====================================================
  // SUBIR FIRMA DEL TÉCNICO
  // =====================================================

  const seleccionarFirmaTecnico = () => {
    if (!setFormData) return;

    const input =
      document.createElement("input");

    input.type = "file";

    input.accept =
      "image/png,image/jpeg,image/webp";

    input.onchange = async (event) => {
      const archivo =
        event.target.files?.[0];

      if (!archivo) return;

      try {
        Swal.fire({
          title: "Subiendo firma...",
          text: "Esperá un momento.",
          allowOutsideClick: false,
          allowEscapeKey: false,

          didOpen: () => {
            Swal.showLoading();
          },
        });

        const url =
          await subirFirmaTecnico(
            archivo
          );

        setFormData((prev) => ({
          ...prev,
          firmaTecnicoUrl: url,
        }));

        await Swal.fire({
          icon: "success",
          title: "Firma cargada",
          text:
            "La firma quedó agregada a la planilla.",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(
          "Error subiendo firma:",
          error
        );

        await Swal.fire({
          icon: "error",
          title:
            "No se pudo subir la firma",
          text:
            error?.message ||
            "Ocurrió un error al subir la imagen.",
        });
      }
    };

    input.click();
  };

  // =====================================================
  // ELIMINAR FIRMA DEL TÉCNICO
  // =====================================================

  const quitarFirmaTecnico = async () => {
    if (!setFormData) return;

    const resultado =
      await Swal.fire({
        icon: "question",
        title: "¿Quitar firma?",
        text:
          "La firma dejará de aparecer en esta planilla.",
        showCancelButton: true,
        confirmButtonText:
          "Sí, quitar",
        cancelButtonText:
          "Cancelar",
      });

    if (!resultado.isConfirmed) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      firmaTecnicoUrl: "",
    }));
  };

  // =====================================================
  // EDITAR CAMPO CON SWEETALERT
  // =====================================================

  const editarCampo = async ({
    campo,
    titulo,
    tipo = "text",
    opciones = null,
  }) => {
    if (!editable || !setFormData) return;

    let resultado;

    if (tipo === "select") {
      resultado = await Swal.fire({
        title: titulo,
        input: "select",
        inputOptions: opciones,
        inputValue:
          formData[campo] || "",
        showCancelButton: true,
        confirmButtonText:
          "Aceptar",
        cancelButtonText:
          "Cancelar",
      });
    } else if (tipo === "textarea") {
      resultado = await Swal.fire({
        title: titulo,
        input: "textarea",
        inputValue:
          formData[campo] || "",
        inputAttributes: {
          rows: "6",
        },
        showCancelButton: true,
        confirmButtonText:
          "Aceptar",
        cancelButtonText:
          "Cancelar",
      });
    } else if (tipo === "date") {
      resultado = await Swal.fire({
        title: titulo,
        input: "date",
        inputValue:
          formData[campo] || "",
        showCancelButton: true,
        confirmButtonText:
          "Aceptar",
        cancelButtonText:
          "Cancelar",
      });
    } else if (tipo === "number") {
      resultado = await Swal.fire({
        title: titulo,
        input: "number",
        inputValue:
          formData[campo] || "",
        showCancelButton: true,
        confirmButtonText:
          "Aceptar",
        cancelButtonText:
          "Cancelar",
      });
    } else {
      resultado = await Swal.fire({
        title: titulo,
        input: "text",
        inputValue:
          formData[campo] || "",
        showCancelButton: true,
        confirmButtonText:
          "Aceptar",
        cancelButtonText:
          "Cancelar",
      });
    }

    if (!resultado.isConfirmed) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [campo]: resultado.value,
    }));
  };

  // =====================================================
  // FILA
  // =====================================================

  const Fila = ({
    titulo,
    campo,
    tipo = "text",
    opciones = null,
    formato,
  }) => {
    const valor =
      formData[campo];

    const valorVisible =
      formato
        ? formato(valor)
        : mostrar(valor);

    return (
      <div className="fila-planilla">

        <div className="celda-planilla titulo-celda">
          {titulo}
        </div>

        <div
          className={
            editable
              ? "celda-planilla valor-celda campo-editable"
              : "celda-planilla valor-celda"
          }
          onClick={() =>
            editarCampo({
              campo,
              titulo,
              tipo,
              opciones,
            })
          }
          title={
            editable
              ? "Hacé clic para editar"
              : undefined
          }
        >
          {valorVisible || (
            editable
              ? (
                <span className="campo-vacio">
                  Editar...
                </span>
              )
              : ""
          )}
        </div>

      </div>
    );
  };

  const TituloSeccion = ({
    children,
  }) => (
    <div className="titulo-seccion-planilla">
      {children}
    </div>
  );

  const opcionesSiNo = {
    "": "Sin seleccionar",
    Sí: "Sí",
    No: "No",
  };

  return (
    <div className="zona-preview">

      <h2>
        {editable
          ? "Editá la planilla"
          : "Vista previa de la planilla"}
      </h2>

      {editable && (
        <p className="ayuda-edicion no-imprimir">
          Hacé clic sobre cualquier dato
          de la planilla para modificarlo.
        </p>
      )}

      {/* ========================================= */}
      {/* HOJA 1                                    */}
      {/* ========================================= */}

      <div className="hoja-planilla">

        <div className="cabecera-documento">

          <img
            src="/logoplanilla.png"
            alt="Logo"
            className="logo-documento"
          />

          <div className="texto-cabecera">

            <div>
              VISORÍA DE LICENCIA C
            </div>

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
          campo="nombreObservador"
        />

        <Fila
          titulo="2. FECHA DE OBSERVACIÓN:"
          campo="fechaObservacion"
          tipo="date"
          formato={fecha}
        />

        <Fila
          titulo="3. FECHA DE ENTREGA DE LA VISORÍA:"
          campo="fechaEntrega"
          tipo="date"
          formato={fecha}
        />


        {/* ========================================= */}
        {/* FIRMA DEL TÉCNICO                         */}
        {/* ========================================= */}

        <div className="fila-planilla fila-firma-tecnico">

          <div className="celda-planilla titulo-celda">
            4. FIRMA Y ACLARACIÓN DE PRESENCIA POR EL TÉCNICO DEL CLUB OBSERVADO:
          </div>

          <div className="celda-planilla valor-celda celda-firma-tecnico">

            {formData.firmaTecnicoUrl ? (

              <div className="firma-tecnico-contenido">

                <img
                  src={
                    formData.firmaTecnicoUrl
                  }
                  alt="Firma del técnico"
                  className="firma-tecnico-img"
                />

                {setFormData && (
                  <div className="acciones-firma-tecnico no-imprimir">

                    <button
                      type="button"
                      className="btn-subir-firma"
                      onClick={
                        seleccionarFirmaTecnico
                      }
                    >
                      Cambiar
                    </button>

                    <button
                      type="button"
                      className="btn-quitar-firma"
                      onClick={
                        quitarFirmaTecnico
                      }
                    >
                      Quitar
                    </button>

                  </div>
                )}

              </div>

            ) : (

              <div className="firma-tecnico-vacia">

                <span className="firma-no-cargada">
                  Sin firma
                </span>

                {setFormData && (
                  <button
                    type="button"
                    className="btn-subir-firma no-imprimir"
                    onClick={
                      seleccionarFirmaTecnico
                    }
                  >
                    Subir firma
                  </button>
                )}

              </div>

            )}

          </div>

        </div>


        <TituloSeccion>
          2. DATOS GENERALES
        </TituloSeccion>

        <Fila
          titulo="NOMBRE DEL CLUB OBSERVADO:"
          campo="club"
        />

        <Fila
          titulo="CATEGORÍA / EDADES DE LOS JUGADORES:"
          campo="categoria"
        />

        <Fila
          titulo="NÚMERO DE JUGADORES PRESENTES:"
          campo="jugadoresPresentes"
          tipo="number"
        />

        <Fila
          titulo="NÚMERO DE PRÁCTICAS SEMANALES:"
          campo="practicasSemanales"
          tipo="number"
        />

        <TituloSeccion>
          3. EL TÉCNICO
        </TituloSeccion>

        <Fila
          titulo="NOMBRE:"
          campo="tecnicoNombre"
        />

        <Fila
          titulo="EXPERIENCIA DE JUGADOR:"
          campo="experienciaJugador"
          tipo="textarea"
        />

        <Fila
          titulo="CAPACITACIÓN COMO ENTRENADOR:"
          campo="capacitacionEntrenador"
          tipo="textarea"
        />

        <Fila
          titulo="¿ENTRENA CON UN EQUIPO DEPORTIVO?"
          campo="entrenaEquipo"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <TituloSeccion>
          4. LA PRÁCTICA
        </TituloSeccion>

        <Fila
          titulo="¿EXISTE UNA ESTRUCTURA DE LA SESIÓN?"
          campo="estructuraSesion"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="TOMA DEL GRUPO:"
          campo="tomaGrupo"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="PRESENTACIÓN DEL TRABAJO:"
          campo="presentacionTrabajo"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="CALENTAMIENTO:"
          campo="calentamiento"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="PARTE PRINCIPAL:"
          campo="partePrincipal"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="PARTE APRENDIZAJE DEL JUEGO:"
          campo="aprendizajeJuego"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="EVALUACIÓN DE LA SESIÓN CON LOS JUGADORES:"
          campo="evaluacionJugadores"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="TIEMPO TOTAL DE LA SESIÓN:"
          campo="tiempoSesion"
          tipo="number"
          formato={(valor) =>
            valor
              ? `${valor} minutos`
              : ""
          }
        />

        <TituloSeccion>
          5. MATERIAL / INFRAESTRUCTURA
        </TituloSeccion>

        <Fila
          titulo="ESPACIO DISPONIBLE:"
          campo="espacioDisponible"
        />

        <Fila
          titulo="MATERIAL DISPONIBLE:"
          campo="materialDisponible"
          tipo="textarea"
        />

        <Fila
          titulo="ACTITUD PEDAGÓGICA:"
          campo="actitudPedagogica"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="PRESENTACIÓN:"
          campo="presentacion"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="DEMOSTRACIÓN:"
          campo="demostracion"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="CONSIGNAS CORRECTAS:"
          campo="consignasCorrectas"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <TituloSeccion>
          6. LA SESIÓN
        </TituloSeccion>

        <Fila
          titulo="¿EL TÉCNICO PROPONE LOS ALCANCES?"
          campo="alcancesSesion"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <Fila
          titulo="¿EXISTE UNA PLANIFICACIÓN A CORTO O LARGO PLAZO?"
          campo="planificacionCortoLargoPlazo"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <TituloSeccion>
          7. CLIMA DE APRENDIZAJE
        </TituloSeccion>

        <Fila
          titulo="COMPORTAMIENTO DEL EDUCADOR:"
          campo="comportamientoEducador"
          tipo="textarea"
        />

        <Fila
          titulo="PARTICIPACIÓN DE LOS NIÑOS:"
          campo="participacionNinos"
          tipo="textarea"
        />

        <TituloSeccion>
          8. AL FINAL DE LA SESIÓN
        </TituloSeccion>

        <Fila
          titulo="RECOLECCIÓN DEL MATERIAL POR LOS NIÑOS:"
          campo="recoleccionMaterial"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

        <TituloSeccion>
          9. EVALUACIÓN DEL ENTRENAMIENTO
        </TituloSeccion>

        <Fila
          titulo="PUNTOS POSITIVOS:"
          campo="puntosPositivos"
          tipo="textarea"
        />

        <Fila
          titulo="PUNTOS A MEJORAR:"
          campo="puntosMejorar"
          tipo="textarea"
        />

        <Fila
          titulo="SESIÓN ADAPTADA AL NIVEL Y A LA EDAD DE LOS NIÑOS:"
          campo="sesionAdaptada"
          tipo="select"
          opciones={
            opcionesSiNo
          }
        />

      </div>


      {/* ========================================= */}
      {/* HOJA 2 - ANEXO ORIGINAL                   */}
      {/* ========================================= */}

      <div className="hoja-planilla segunda-hoja hoja-anexo">

        {/* ANEXO */}

        <div className="encabezado-anexo">

          <strong>
            ANEXO, OBSERVACIONES:
          </strong>

          <p>
            *En caso de querer agregar alguna observación indicar el Número de ítem a comentar:
          </p>

        </div>

        {/* CAMPO GRANDE DE OBSERVACIONES */}

        <div
          className={
            editable
              ? "campo-anexo-observaciones campo-editable"
              : "campo-anexo-observaciones"
          }
          onClick={() =>
            editarCampo({
              campo: "otrosDatos",
              titulo:
                "Anexo / observaciones",
              tipo:
                "textarea",
            })
          }
          title={
            editable
              ? "Hacé clic para editar"
              : undefined
          }
        >

          {mostrar(
            formData.otrosDatos
          ) || (
            editable
              ? (
                <span className="campo-vacio">
                  Editar observaciones...
                </span>
              )
              : ""
          )}

        </div>


        {/* FIRMA DE JORGE */}

        <div className="firma-alumno firma-inferior">

          <img
            src="/firmadejorge.png"
            alt="Firma de Jorge Jaureguiberry"
            className="firma-jorge-img"
          />

          <div className="linea-firma"></div>

          <p>
            Firma del alumno observador.
          </p>

          <strong>
            Jorge Jaureguiberry
          </strong>

        </div>

      </div>

    </div>
  );
}

export default PlanillaPreview;