import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from './models/auth-request';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(http: HttpClient
  ) {
  }

  // auth(authReq: AuthRequest): Observable<AuthResponse>{
  //   return this.http
  // }
}
