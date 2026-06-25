import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, tap, throwError } from 'rxjs';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const customMessage = req.headers.get('X-Toast-Message');

  return next(req).pipe(
    filter((event): event is HttpResponse<any> => event instanceof HttpResponse),
    tap((event) => {
      if (event.status >= 200 && event.status < 300 && req.method !== 'GET') {
        const mensaje = customMessage || 'Operación completada';
        toastr.success(mensaje, 'Éxito');
      }
    }),
    catchError((error) => {
      const msg = error.error?.message || 'Error desconocido';
      toastr.error(`Ocurrio un error: ${msg}`);
      return throwError(() => error);
    }),
  );
};
