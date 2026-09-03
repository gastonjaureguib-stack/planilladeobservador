import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


// =====================================================
// LIMPIAR NOMBRE DE ARCHIVO
// =====================================================

const limpiarNombre = (nombre = "planilla") => {
  return nombre
    .trim()
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "-");
};


// =====================================================
// ESPERAR A QUE CARGUEN LAS IMÁGENES
// =====================================================

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


// =====================================================
// CREAR PDF
// =====================================================

export const crearPDF = async () => {
  const hojas = Array.from(
    document.querySelectorAll(".hoja-planilla")
  );

  if (hojas.length === 0) {
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


  for (let i = 0; i < hojas.length; i++) {
    const hoja = hojas[i];

    await esperarImagenes(hoja);


    const canvas = await html2canvas(hoja, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
    });


    const imagen = canvas.toDataURL(
      "image/jpeg",
      0.95
    );


    if (i > 0) {
      pdf.addPage("a4", "portrait");
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
  }


  return pdf;
};


// =====================================================
// DESCARGAR
// =====================================================

export const descargarPDF = async (
  nombrePlanilla = "planilla"
) => {
  const pdf = await crearPDF();

  const nombre =
    limpiarNombre(nombrePlanilla);

  pdf.save(`${nombre}.pdf`);
};


// =====================================================
// COMPARTIR DESDE EL CELULAR
// =====================================================

export const compartirPDF = async (
  nombrePlanilla = "planilla"
) => {
  const pdf = await crearPDF();

  const nombre =
    `${limpiarNombre(nombrePlanilla)}.pdf`;

  const blob = pdf.output("blob");

  const archivo = new File(
    [blob],
    nombre,
    {
      type: "application/pdf",
    }
  );


  // Compartir nativo de celular
  if (
    navigator.share &&
    navigator.canShare &&
    navigator.canShare({
      files: [archivo],
    })
  ) {
    await navigator.share({
      title: nombrePlanilla,
      text: "Planilla de observación",
      files: [archivo],
    });

    return;
  }


  // Si el dispositivo no permite compartir archivos,
  // descargamos normalmente.
  pdf.save(nombre);
};