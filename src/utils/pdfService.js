import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/* =====================================================
   LIMPIAR NOMBRE DEL ARCHIVO
===================================================== */

const limpiarNombre = (nombre = "planilla") => {
  return nombre
    .trim()
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "-");
};


/* =====================================================
   ESPERAR A QUE CARGUEN LAS IMÁGENES
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
   CREAR COPIA DE LA HOJA PARA GENERAR EL PDF
===================================================== */

const crearHojaParaPDF = (
  hojaOriginal,
  indiceHoja
) => {
  const contenedor =
    document.createElement("div");

  contenedor.style.position = "fixed";
  contenedor.style.left = "-10000px";
  contenedor.style.top = "0";
  contenedor.style.width = "794px";
  contenedor.style.background = "#ffffff";
  contenedor.style.zIndex = "-9999";

  const hoja =
    hojaOriginal.cloneNode(true);


  /* =====================================================
     CONFIGURACIÓN GENERAL DE LA HOJA
  ===================================================== */

  hoja.style.setProperty(
    "box-sizing",
    "border-box",
    "important"
  );

  hoja.style.setProperty(
    "width",
    "794px",
    "important"
  );

  hoja.style.setProperty(
    "min-width",
    "794px",
    "important"
  );

  hoja.style.setProperty(
    "max-width",
    "794px",
    "important"
  );

  hoja.style.setProperty(
    "height",
    "auto",
    "important"
  );

  hoja.style.setProperty(
    "min-height",
    "0",
    "important"
  );

  hoja.style.setProperty(
    "max-height",
    "none",
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
    "visible",
    "important"
  );


  /* =====================================================
     PÁGINA 1
  ===================================================== */

  if (indiceHoja === 0) {
    hoja.style.setProperty(
      "padding",
      "38px 45px",
      "important"
    );
  }


  /* =====================================================
     PÁGINA 2 - ANEXO
     MENOS ESPACIO ARRIBA
  ===================================================== */

  if (indiceHoja === 1) {
    hoja.style.setProperty(
      "padding",
      "20px 45px 30px",
      "important"
    );

    hoja.style.setProperty(
      "min-height",
      "0",
      "important"
    );

    const encabezadoAnexo =
      hoja.querySelector(
        ".encabezado-anexo"
      );

    if (encabezadoAnexo) {
      encabezadoAnexo.style.setProperty(
        "margin-top",
        "0",
        "important"
      );

      encabezadoAnexo.style.setProperty(
        "margin-bottom",
        "6px",
        "important"
      );
    }


    /* CUADRO DE OBSERVACIONES */

    const observaciones =
      hoja.querySelector(
        ".campo-anexo-observaciones"
      );

    if (observaciones) {
      observaciones.style.setProperty(
        "min-height",
        "210px",
        "important"
      );

      observaciones.style.setProperty(
        "height",
        "210px",
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
    }


    /* FIRMA */

    const firmaInferior =
      hoja.querySelector(
        ".firma-inferior"
      );

    if (firmaInferior) {
      firmaInferior.style.setProperty(
        "margin-top",
        "25px",
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
        "120px",
        "important"
      );

      firmaJorge.style.setProperty(
        "max-width",
        "120px",
        "important"
      );

      firmaJorge.style.setProperty(
        "height",
        "auto",
        "important"
      );

      firmaJorge.style.setProperty(
        "max-height",
        "75px",
        "important"
      );

      firmaJorge.style.setProperty(
        "margin",
        "0 auto 3px",
        "important"
      );

      firmaJorge.style.setProperty(
        "object-fit",
        "contain",
        "important"
      );
    }
  }


  /* =====================================================
     CABECERA PÁGINA 1
  ===================================================== */

  const cabecera =
    hoja.querySelector(
      ".cabecera-documento"
    );

  if (cabecera) {
    cabecera.style.setProperty(
      "margin-bottom",
      "18px",
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
        "8px",
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

  const valores =
    hoja.querySelectorAll(
      ".valor-celda"
    );

  valores.forEach((valor) => {
    valor.style.setProperty(
      "font-weight",
      "600",
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
      "height",
      "auto",
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
      "height",
      "auto",
      "important"
    );

    grafica.style.setProperty(
      "font-size",
      "9px",
      "important"
    );
  }


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

  if (
    hojasOriginales.length === 0
  ) {
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


  const anchoA4 = 210;
  const altoA4 = 297;

  const margenX = 7;
  const margenY = 7;

  const anchoDisponible =
    anchoA4 - margenX * 2;

  const altoDisponible =
    altoA4 - margenY * 2;


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


      /*
       * Pequeña espera para que el navegador
       * termine de calcular tamaños e imágenes.
       */
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 100)
      );


      const altoReal =
        Math.ceil(
          hoja.scrollHeight
        );


      const canvas =
        await html2canvas(
          hoja,
          {
            scale: 2,

            useCORS: true,

            allowTaint: true,

            backgroundColor:
              "#ffffff",

            logging: false,

            width: 794,

            height: altoReal,

            windowWidth: 1200,

            scrollX: 0,

            scrollY: 0,
          }
        );


      const imagen =
        canvas.toDataURL(
          "image/jpeg",
          0.96
        );


      if (i > 0) {
        pdf.addPage(
          "a4",
          "portrait"
        );
      }


      const proporcion =
        canvas.width /
        canvas.height;


      let anchoFinal =
        anchoDisponible;

      let altoFinal =
        anchoFinal /
        proporcion;


      /*
       * Si la hoja supera el alto disponible,
       * se reduce proporcionalmente.
       */
      if (
        altoFinal >
        altoDisponible
      ) {
        altoFinal =
          altoDisponible;

        anchoFinal =
          altoFinal *
          proporcion;
      }


      /*
       * CENTRADO HORIZONTAL
       */
      const x =
        (anchoA4 -
          anchoFinal) /
        2;


      /*
       * IMPORTANTE:
       *
       * Antes estaba:
       *
       * const y =
       *   (altoA4 - altoFinal) / 2;
       *
       * Eso centraba verticalmente
       * la segunda página y generaba
       * todo el espacio vacío arriba.
       *
       * Ahora comienza desde arriba.
       */
      const y = margenY;


      pdf.addImage(
        imagen,
        "JPEG",
        x,
        y,
        anchoFinal,
        altoFinal,
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

export const descargarPDF =
  async (
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