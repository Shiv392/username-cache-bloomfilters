import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../shared/services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const detail = error.error?.error ?? error.error?.message ?? error.message ?? 'Unexpected error';
        
        this.notification.showError({ summary: 'Request failed', detail });
        return throwError(() => error);
      })
    );
  }
}
