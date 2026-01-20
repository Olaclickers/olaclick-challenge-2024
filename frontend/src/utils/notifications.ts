// src/utils/notifications.ts
import Swal from 'sweetalert2';

export const showErrorToast = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showSuccessToast = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};