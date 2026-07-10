import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  router = inject(Router)
  constructor(
    private http: HttpClient,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // if (
    //   req.url.includes('/api/login') ||
    //   req.url.includes('/api/refresh_token')
    // ) {
    //   return next.handle(req);
    // }

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {

          return this.http
            .get('/api/refresh_token', {
              withCredentials: true
            })
            .pipe(

              switchMap(() => {

                return next.handle(req);

              }),

              catchError((err: HttpErrorResponse) => {
                this.router.navigate(['login'])
                return throwError(() => err);
              })
            );
        }

        return throwError(() => error);

      })

    );

  }
}