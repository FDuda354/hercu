import {Injectable} from '@angular/core';
import { CustomerDTO } from '../../components/common/models/customer-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
// import jwt_decode from 'jwt-decode';
// npm install jwt-decode
// npm install --save @types/jwt-decode


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

  setCustomer(customer: CustomerDTO) {
    localStorage.setItem('customer', JSON.stringify(customer));
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
    return token != null  && !jwtHelper.isTokenExpired(token);

  }



}
