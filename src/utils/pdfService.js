import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/* =====================================================
   CONSTANTES A4
===================================================== */

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;


/* =====================================================
   LIMPIAR NOMBRE
===================================================== */

const limpiarNombre = (nombre = "planilla") => {
  return nombre
    .trim()
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "-");
};


/* =====================================================
   ESPERAR IMÁGENES
===================================================== */

const esperarImagenes = async (elemento) => {
  const imagenes = Array.from(
    elemento.querySelectorAll("img")
  );

  await Promise.all(
    imagenes.map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};


/* =====================================================
   ESPERAR RENDER DEL NAVEGADOR
===================================================== */

const esperarRender = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};


/* =====================================================
   CREAR HOJA FIJA A4
===================================================== */

const crearHojaParaPDF = (
  hojaOriginal,
  indiceHoja
) => {
  const contenedor =
    document.createElement("div");

  /*
   * El contenedor queda fuera de pantalla,
   * pero sigue siendo renderizado.
   *
   * IMPORTANTE:
   * usamos position absolute en lugar de fixed
   * para evitar problemas con el viewport móvil.
   */

  contenedor.style.position = "absolute";
  contenedor.style.left = "0";
  contenedor.style.top = "0";

  contenedor.style.transform =
    "translateX(-10000px)";

  contenedor.style.transformOrigin =
    "top left";

  contenedor.style.width =
    `${A4_WIDTH_PX}px`;

  contenedor.style.minWidth =
    `${A4_WIDTH_PX}px`;

  contenedor.style.maxWidth =
    `${A4_WIDTH_PX}px`;

  contenedor.style.height =
    `${A4_HEIGHT_PX}px`;

  contenedor.style.minHeight =
    `${A4_HEIGHT_PX}px`;

  contenedor.style.maxHeight =
    `${A4_HEIGHT_PX}px`;

  contenedor.style.background =
    "#ffffff";

  contenedor.style.overflow =
    "hidden";

  contenedor.style.zIndex =
    "-99999";


  const hoja =
    hojaOriginal.cloneNode(true);


  /*
   * Clase exclusiva para localizar
   * esta hoja dentro del clon creado
   * por html2canvas.
   */

  hoja.classList.add("modo-pdf");


  hoja.style.setProperty(
    "position",
    "relative",
    "important"
  );

  hoja.style.setProperty(
    "transform",
    "none",
    "important"
  );

  hoja.style.setProperty(
    "zoom",
    "1",
    "important"
  );


  /* =====================================================
     FORZAR TAMAÑO A4
  ===================================================== */

  hoja.style.setProperty(
    "box-sizing",
    "border-box",
    "important"
  );

  hoja.style.setProperty(
    "width",
    `${A4_WIDTH_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "min-width",
    `${A4_WIDTH_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "max-width",
    `${A4_WIDTH_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "height",
    `${A4_HEIGHT_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "min-height",
    `${A4_HEIGHT_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "max-height",
    `${A4_HEIGHT_PX}px`,
    "important"
  );

  hoja.style.setProperty(
    "margin",
    "0",
    "important"
  );

  hoja.style.setProperty(
    "background",
    "#ffffff",
    "important"
  );

  hoja.style.setProperty(
    "border",
    "none",
    "important"
  );

  hoja.style.setProperty(
    "box-shadow",
    "none",
    "important"
  );

  hoja.style.setProperty(
    "overflow",
    "hidden",
    "important"
  );


  /* =====================================================
     HOJA 1
  ===================================================== */

  if (indiceHoja === 0) {
    hoja.style.setProperty(
      "padding",
      "35px 45px",
      "important"
    );
  }


  /* =====================================================
     HOJA 2
  ===================================================== */

  if (indiceHoja === 1) {
    hoja.style.setProperty(
      "padding",
      "35px 45px",
      "important"
    );


    /* ENCABEZADO ANEXO */

    const encabezadoAnexo =
      hoja.querySelector(
        ".encabezado-anexo"
      );

    if (encabezadoAnexo) {
      encabezadoAnexo.style.setProperty(
        "margin",
        "0 0 8px 0",
        "important"
      );
    }


    /* OBSERVACIONES */

    const observaciones =
      hoja.querySelector(
        ".campo-anexo-observaciones"
      );

    if (observaciones) {
      observaciones.style.setProperty(
        "box-sizing",
        "border-box",
        "important"
      );

      observaciones.style.setProperty(
        "width",
        "100%",
        "important"
      );

      observaciones.style.setProperty(
        "height",
        "230px",
        "important"
      );

      observaciones.style.setProperty(
        "min-height",
        "230px",
        "important"
      );

      observaciones.style.setProperty(
        "max-height",
        "230px",
        "important"
      );

      observaciones.style.setProperty(
        "padding",
        "10px",
        "important"
      );

      observaciones.style.setProperty(
        "font-size",
        "9px",
        "important"
      );

      observaciones.style.setProperty(
        "line-height",
        "1.35",
        "important"
      );

      observaciones.style.setProperty(
        "overflow",
        "hidden",
        "important"
      );
    }


    /* BLOQUE FIRMA */

    const firmaInferior =
      hoja.querySelector(
        ".firma-inferior"
      );

    if (firmaInferior) {
      firmaInferior.style.setProperty(
        "margin-top",
        "30px",
        "important"
      );

      firmaInferior.style.setProperty(
        "margin-bottom",
        "0",
        "important"
      );
    }


    const firmaAlumno =
      hoja.querySelector(
        ".firma-alumno"
      );

    if (firmaAlumno) {
      firmaAlumno.style.setProperty(
        "width",
        "230px",
        "important"
      );

      firmaAlumno.style.setProperty(
        "margin-left",
        "0",
        "important"
      );

      firmaAlumno.style.setProperty(
        "margin-right",
        "auto",
        "important"
      );
    }


    const firmaJorge =
      hoja.querySelector(
        ".firma-jorge-img"
      );

    if (firmaJorge) {
      firmaJorge.style.setProperty(
        "display",
        "block",
        "important"
      );

      firmaJorge.style.setProperty(
        "width",
        "140px",
        "important"
      );

      firmaJorge.style.setProperty(
        "max-width",
        "140px",
        "important"
      );

      firmaJorge.style.setProperty(
        "height",
        "70px",
        "important"
      );

      firmaJorge.style.setProperty(
        "max-height",
        "70px",
        "important"
      );

      firmaJorge.style.setProperty(
        "object-fit",
        "contain",
        "important"
      );

      firmaJorge.style.setProperty(
        "margin",
        "0 auto 3px",
        "important"
      );
    }
  }


  /* =====================================================
     CABECERA
  ===================================================== */

  const cabecera =
    hoja.querySelector(
      ".cabecera-documento"
    );

  if (cabecera) {
    cabecera.style.setProperty(
      "margin-bottom",
      "16px",
      "important"
    );
  }


  const logo =
    hoja.querySelector(
      ".logo-documento"
    );

  if (logo) {
    logo.style.setProperty(
      "width",
      "100px",
      "important"
    );

    logo.style.setProperty(
      "max-width",
      "100px",
      "important"
    );

    logo.style.setProperty(
      "height",
      "auto",
      "important"
    );
  }


  const textoCabecera =
    hoja.querySelector(
      ".texto-cabecera"
    );

  if (textoCabecera) {
    textoCabecera.style.setProperty(
      "font-size",
      "9px",
      "important"
    );

    textoCabecera.style.setProperty(
      "line-height",
      "1.25",
      "important"
    );
  }


  /* =====================================================
     TÍTULOS
  ===================================================== */

  hoja
    .querySelectorAll(
      ".titulo-seccion-planilla"
    )
    .forEach((titulo) => {
      titulo.style.setProperty(
        "margin-top",
        "7px",
        "important"
      );

      titulo.style.setProperty(
        "padding",
        "3px 5px",
        "important"
      );

      titulo.style.setProperty(
        "font-size",
        "8px",
        "important"
      );
    });


  /* =====================================================
     FILAS
  ===================================================== */

  hoja
    .querySelectorAll(
      ".fila-planilla"
    )
    .forEach((fila) => {
      fila.style.setProperty(
        "display",
        "grid",
        "important"
      );

      fila.style.setProperty(
        "grid-template-columns",
        "55% 45%",
        "important"
      );
    });


  /* =====================================================
     CELDAS
  ===================================================== */

  hoja
    .querySelectorAll(
      ".celda-planilla"
    )
    .forEach((celda) => {
      celda.style.setProperty(
        "box-sizing",
        "border-box",
        "important"
      );

      celda.style.setProperty(
        "min-height",
        "18px",
        "important"
      );

      celda.style.setProperty(
        "padding",
        "2px 5px",
        "important"
      );

      celda.style.setProperty(
        "font-size",
        "7.5px",
        "important"
      );

      celda.style.setProperty(
        "line-height",
        "1.15",
        "important"
      );

      celda.style.setProperty(
        "color",
        "#111111",
        "important"
      );
    });


  /* =====================================================
     VALORES
  ===================================================== */

  hoja
    .querySelectorAll(
      ".valor-celda"
    )
    .forEach((valor) => {
      valor.style.setProperty(
        "font-weight",
        "600",
        "important"
      );

      valor.style.setProperty(
        "color",
        "#111111",
        "important"
      );
    });


  /* =====================================================
     OTROS DATOS
  ===================================================== */

  const otrosDatos =
    hoja.querySelector(
      ".campo-grande-planilla"
    );

  if (otrosDatos) {
    otrosDatos.style.setProperty(
      "min-height",
      "220px",
      "important"
    );

    otrosDatos.style.setProperty(
      "font-size",
      "9px",
      "important"
    );
  }


  /* =====================================================
     GRÁFICA
  ===================================================== */

  const grafica =
    hoja.querySelector(
      ".campo-grafico-planilla"
    );

  if (grafica) {
    grafica.style.setProperty(
      "min-height",
      "480px",
      "important"
    );

    grafica.style.setProperty(
      "font-size",
      "9px",
      "important"
    );
  }


  /* =====================================================
     QUITAR BOTONES DEL PDF
  ===================================================== */

  hoja
    .querySelectorAll(
      "button, .no-imprimir"
    )
    .forEach((elemento) => {
      elemento.style.setProperty(
        "display",
        "none",
        "important"
      );
    });


  contenedor.appendChild(hoja);

  document.body.appendChild(
    contenedor
  );

  return {
    hoja,
    contenedor,
  };
};


/* =====================================================
   CREAR PDF
===================================================== */

export const crearPDF = async () => {
  const hojasOriginales =
    Array.from(
      document.querySelectorAll(
        ".hoja-planilla"
      )
    );

  if (hojasOriginales.length === 0) {
    throw new Error(
      "No se encontró la planilla para generar el PDF."
    );
  }


  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });


  for (
    let i = 0;
    i < hojasOriginales.length;
    i++
  ) {
    const {
      hoja,
      contenedor,
    } = crearHojaParaPDF(
      hojasOriginales[i],
      i
    );

    try {
      await esperarImagenes(hoja);

      await esperarRender();


      const canvas =
        await html2canvas(
          hoja,
          {
            scale: 2,

            backgroundColor:
              "#ffffff",

            useCORS: true,

            allowTaint: true,

            logging: false,

            width:
              A4_WIDTH_PX,

            height:
              A4_HEIGHT_PX,

            /*
             * CLAVE PARA CELULAR:
             * el viewport utilizado por html2canvas
             * ahora tiene exactamente el ancho
             * del documento A4.
             */

            windowWidth:
              A4_WIDTH_PX,

            windowHeight:
              A4_HEIGHT_PX,

            scrollX: 0,

            scrollY: 0,

            x: 0,

            y: 0,

            removeContainer: true,


            /*
             * html2canvas genera internamente
             * otro documento clonado.
             *
             * Volvemos a forzar allí el tamaño
             * para impedir que entren estilos
             * responsive del celular.
             */

            onclone: (
              documentoClonado
            ) => {
              const hojaClonada =
                documentoClonado
                  .querySelector(
                    ".modo-pdf"
                  );

              if (!hojaClonada) {
                return;
              }


              hojaClonada.style.setProperty(
                "box-sizing",
                "border-box",
                "important"
              );

              hojaClonada.style.setProperty(
                "position",
                "relative",
                "important"
              );

              hojaClonada.style.setProperty(
                "width",
                `${A4_WIDTH_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "min-width",
                `${A4_WIDTH_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "max-width",
                `${A4_WIDTH_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "height",
                `${A4_HEIGHT_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "min-height",
                `${A4_HEIGHT_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "max-height",
                `${A4_HEIGHT_PX}px`,
                "important"
              );

              hojaClonada.style.setProperty(
                "margin",
                "0",
                "important"
              );

              hojaClonada.style.setProperty(
                "transform",
                "none",
                "important"
              );

              hojaClonada.style.setProperty(
                "zoom",
                "1",
                "important"
              );

              hojaClonada.style.setProperty(
                "background",
                "#ffffff",
                "important"
              );

              hojaClonada.style.setProperty(
                "overflow",
                "hidden",
                "important"
              );
            },
          }
        );


      const imagen =
        canvas.toDataURL(
          "image/jpeg",
          0.95
        );


      if (i > 0) {
        pdf.addPage(
          "a4",
          "portrait"
        );
      }


      pdf.addImage(
        imagen,
        "JPEG",
        0,
        0,
        210,
        297,
        undefined,
        "FAST"
      );

    } finally {
      contenedor.remove();
    }
  }


  return pdf;
};


/* =====================================================
   DESCARGAR PDF
===================================================== */

export const descargarPDF = async (
  nombrePlanilla = "planilla"
) => {
  const pdf =
    await crearPDF();

  const nombre =
    limpiarNombre(
      nombrePlanilla
    );

  pdf.save(
    `${nombre}.pdf`
  );
};