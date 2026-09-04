import { supabase } from "../lib/supabase";

export const subirFirmaTecnico = async (archivo) => {
  if (!archivo) {
    throw new Error("No se seleccionó ninguna imagen.");
  }

  if (!archivo.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen.");
  }

  const extension =
    archivo.name.split(".").pop() || "png";

  const nombreArchivo =
    `${crypto.randomUUID()}.${extension}`;

  const ruta =
    `firmas/${nombreArchivo}`;

  const { error } = await supabase.storage
    .from("firmas-tecnicos")
    .upload(ruta, archivo, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("firmas-tecnicos")
    .getPublicUrl(ruta);

  return data.publicUrl;
};