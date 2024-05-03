import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private jwtService: JwtService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtService.isLoggedIn()) {
      const token = this.jwtService.getToken()
      if (token) {
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }

}
