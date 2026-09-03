import { supabase } from "../lib/supabase";

export async function obtenerObservaciones() {
  const { data, error } = await supabase
    .from("observaciones")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Error obteniendo observaciones:",
      error
    );

    throw error;
  }

  return data || [];
}

export async function crearObservacion(
  nombrePlanilla,
  formData
) {
  const registro = {
    nombre_planilla:
      nombrePlanilla.trim(),

    nombre_observador:
      formData.nombreObservador?.trim() ||
      "Sin especificar",

    club:
      formData.club?.trim() ||
      "Sin especificar",

    categoria:
      formData.categoria?.trim() ||
      null,

    tecnico_nombre:
      formData.tecnicoNombre?.trim() ||
      null,

    fecha_observacion:
      formData.fechaObservacion ||
      null,

    fecha_entrega:
      formData.fechaEntrega ||
      null,

    datos: formData,
  };

  const { data, error } = await supabase
    .from("observaciones")
    .insert([registro])
    .select()
    .single();

  if (error) {
    console.error(
      "Error creando observación:",
      error
    );

    throw error;
  }

  return data;
}

export async function actualizarObservacion(
  id,
  nombrePlanilla,
  formData
) {
  const registro = {
    nombre_planilla:
      nombrePlanilla.trim(),

    nombre_observador:
      formData.nombreObservador?.trim() ||
      "Sin especificar",

    club:
      formData.club?.trim() ||
      "Sin especificar",

    categoria:
      formData.categoria?.trim() ||
      null,

    tecnico_nombre:
      formData.tecnicoNombre?.trim() ||
      null,

    fecha_observacion:
      formData.fechaObservacion ||
      null,

    fecha_entrega:
      formData.fechaEntrega ||
      null,

    datos: formData,
  };

  const { data, error } = await supabase
    .from("observaciones")
    .update(registro)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Error actualizando observación:",
      error
    );

    throw error;
  }

  return data;
}

export async function eliminarObservacion(id) {
  const { error } = await supabase
    .from("observaciones")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Error eliminando observación:",
      error
    );

    throw error;
  }

  return true;
}

export async function buscarObservaciones(
  termino
) {
  const busqueda =
    termino?.trim() || "";

  if (!busqueda) {
    return obtenerObservaciones();
  }

  const { data, error } = await supabase
    .rpc(
      "buscar_observaciones",
      {
        termino: busqueda,
      }
    );

  if (error) {
    console.error(
      "Error buscando observaciones:",
      error
    );

    throw error;
  }

  return data || [];
}