import {Injectable} from '@angular/core';
import { CustomerDTO } from '../../components/common/models/customer-dto';
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

  setCustomer(customer: CustomerDTO) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  getCustomer(): string | null {
    return localStorage.getItem('customer');
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    return token != null //TODO && this.notExpired(token);

  }

  // private notExpired(token: string): boolean {
  //   let tokenDecoded = jwt_decode<any>(token);
  //   return new Date().getTime() < (tokenDecoded.exp * 1000);
  // }

  removeToken() {
    localStorage.removeItem('token');
  }

}
