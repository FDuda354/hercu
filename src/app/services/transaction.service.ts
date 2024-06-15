import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../components/common/models/page';
import { Transaction } from '../components/common/models/transaction';
import { TransactionRequest } from '../components/common/components/debt-details/pay-form/pay-form.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getTransactionsByCustomerId(page: number, size: number): Observable<Page<Transaction>> {
    return this.http.get<Page<Transaction>>(this.baseUrl + `/api/transaction/all?page=${page}&size=${size}`)
  }

  getTransactionsByDebtId(id: string, page: number, size: number) {
    return this.http.get<Page<Transaction>>(this.baseUrl + `/api/transaction?debtId=${id}&page=${page}&size=${size}`)
  }

  addTransaction(transactionRequest: TransactionRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + `/api/transaction`, transactionRequest)
  }
}
