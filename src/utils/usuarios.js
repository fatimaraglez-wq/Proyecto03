// "Base de datos" de práctica con localStorage (solo para la escuela, no es segura)
const CLAVE = 'usuarios';

export const obtenerUsuarios = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
};

export const guardarUsuario = (usuario) => {
  const usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem(CLAVE, JSON.stringify(usuarios));
};

export const buscarPorCorreo = (correo) =>
  obtenerUsuarios().find((u) => u.correo.toLowerCase() === correo.toLowerCase());
