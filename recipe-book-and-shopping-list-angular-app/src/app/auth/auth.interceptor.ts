import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let idToken: string;
    this.authService.user.subscribe((user: User) => {
      idToken = user.token;
      console.log('idToken', idToken);
    });
    const modifiedReq = request.clone({
      params: new HttpParams().set('auth', idToken),
    });
    return next.handle(modifiedReq);
  }
}
