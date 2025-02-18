import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccess(message: string, title: string = 'Success') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#4caf50',
      customClass: {
        popup: 'sweetalert-popup',
      },
    });
  }

  showError(message: string, title: string = 'Error') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#f44336',
      customClass: {
        popup: 'sweetalert-popup',
      },
    });
  }
}
