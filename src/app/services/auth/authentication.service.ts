import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from './models/auth-request';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
  }

  login(authReq: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiService.getBaseUrl() + '/auth/login', authReq)
  }
}
