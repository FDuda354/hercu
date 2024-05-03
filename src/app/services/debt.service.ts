import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../components/common/models/page';
import { CustomerDTO } from '../components/common/models/customer-dto';
import { DebtDTO } from '../components/common/models/debt-dto';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDebtsForCreditor(page: number, size: number): Observable<Page<DebtDTO>> {
    return this.http.get<Page<DebtDTO>>(this.baseUrl +`/api/debt/creditors?page=${page}&size=${size}`)
  }

  getDebtsForDebtor(page: number, size: number): Observable<Page<DebtDTO>> {
    return this.http.get<Page<DebtDTO>>(this.baseUrl +`/api/debt/debtors?page=${page}&size=${size}`)
  }
}
