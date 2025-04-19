import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * Exibe uma notificação toast
   * @param message Mensagem a ser exibida
   * @param type Tipo da notificação
   * @param duration Duração em milissegundos
   */
  showToast(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: type,
      title: message
    });
  }

  /**
   * Exibe uma notificação de confirmação
   * @param title Título da confirmação
   * @param text Texto da confirmação
   * @param confirmButtonText Texto do botão de confirmação
   * @param cancelButtonText Texto do botão de cancelamento
   * @returns Promise<boolean>
   */
  confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Sim',
    cancelButtonText: string = 'Não'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  /**
   * Exibe uma notificação de sucesso
   * @param title Título da notificação
   * @param text Texto da notificação
   */
  success(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text
    });
  }

  /**
   * Exibe uma notificação de erro
   * @param title Título da notificação
   * @param text Texto da notificação
   */
  error(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text
    });
  }

  /**
   * Exibe uma notificação de aviso
   * @param title Título da notificação
   * @param text Texto da notificação
   */
  warning(title: string, text: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text
    });
  }

  /**
   * Exibe uma notificação informativa
   * @param title Título da notificação
   * @param text Texto da notificação
   */
  info(title: string, text: string): void {
    Swal.fire({
      icon: 'info',
      title,
      text
    });
  }
} 