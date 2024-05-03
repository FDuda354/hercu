import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../components/common/models/customer-dto';
import { Page } from '../components/common/models/page';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDebtors(page: number, size: number): Observable<Page<CustomerDTO>> {
    return this.http.get<Page<CustomerDTO>>(this.baseUrl + `/api/customers?page=${page}&size=${size}`)
  }
}
