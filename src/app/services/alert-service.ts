import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  
  success(message: string, title: string = '¡Éxito!'){
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  error(message: string, title: string = '¡Error!'){
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  warning(message: string, title: string = '¡Advertencia!'){
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  confirm(message: string, title: string = '¿Estás seguro?'){
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
  }

}
