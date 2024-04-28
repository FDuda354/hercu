import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from './models/auth-request';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) {
  }

  login(authReq: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/login', authReq)
  }
}
