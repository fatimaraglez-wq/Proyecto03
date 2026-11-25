import Swal from 'sweetalert2';

export const alertaExito = (titulo, texto = '') =>
  Swal.fire({ icon: 'success', title: titulo, text: texto, confirmButtonText: 'Aceptar' });

export const alertaError = (titulo, texto = '') =>
  Swal.fire({ icon: 'error', title: titulo, text: texto });

export const confirmar = (titulo, texto = '') =>
  Swal.fire({
    icon: 'question',
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  }).then((r) => r.isConfirmed);
