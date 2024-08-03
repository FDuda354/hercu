import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }


  getCustomer(): string | null {
    return localStorage.getItem('customer');
  }

  removeCustomer() {
    localStorage.removeItem('customer');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return token != null && !jwtHelper.isTokenExpired(token);

  }


}
