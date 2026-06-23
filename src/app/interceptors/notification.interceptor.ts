import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  const customMessage = req.headers.get('X-Toast-Message');

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        if (req.method !== 'GET') {
          const mensaje = customMessage || 'Operación completada';
          toastr.success(mensaje, 'Éxito');
        }
      }
    }),
    catchError((error) => {
      const toastr = inject(ToastrService);
      toastr.error('Ocurrio un error: ' + (error.error?.message || 'Error desconocido'));
      return throwError(() => error);
    }),
  );
};
