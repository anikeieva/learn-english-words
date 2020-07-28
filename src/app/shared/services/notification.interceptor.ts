import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest: HttpRequest<any> = request.clone();

    return next.handle(clonedRequest).pipe(
      catchError((error: Error) => {
        const message: string = error.message;
        this.snackBar.open(message, '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        return throwError(error);
      })
    );
  }
}
