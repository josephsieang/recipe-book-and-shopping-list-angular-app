import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AuthState } from './store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let idToken: string = null;
    this.store.select('auth').subscribe((authState: AuthState) => {
      idToken = authState.user && authState.user.token;
      // console.log('idToken', idToken);
    });
    if (idToken !== null) {
      const modifiedReq = request.clone({
        params: new HttpParams().set('auth', idToken),
      });
      console.log(modifiedReq);
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
