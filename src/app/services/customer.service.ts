import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  CustomerRegistrationRequest
} from '../components/modules/registration-page/registration-form/customer-registration-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }


  register(req: CustomerRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + `/api/customers`, req);
  }

  getCustomerImage(customerImage: string): Observable<Blob> {
    return this.http.get(this.baseUrl + `/api/customers/image?customerImage=${customerImage}`, {responseType: 'blob'});
  }
}
