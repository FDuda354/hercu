import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../components/common/models/customer-dto';
import { Page } from '../components/common/models/page';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getDebtors(page: number, size: number): Observable<Page<CustomerDTO>> {
    return this.http.get<Page<CustomerDTO>>(`http://localhost:8080/api/customers?page=${page}&size=${size}`)
  }
}
