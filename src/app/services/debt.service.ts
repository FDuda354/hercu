import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../components/common/models/page';
import { DebtDTO } from '../components/common/models/debt-dto';
import { DebtRequest } from '../components/common/components/add-debt/debt-request';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDebtById(debtId: string | null): Observable<DebtDTO> {
    return this.http.get<DebtDTO>(this.baseUrl + `/api/debt?debtId=${debtId}`);
  }

  getDebtAmountSum(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/debt`)
  }

  getCreditorAmountSum(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/credit`)
  }

  getDebtsForCreditor(page: number, size: number, onlyActive: boolean): Observable<Page<DebtDTO>> {
    return this.http.get<Page<DebtDTO>>(this.baseUrl + `/api/debt/creditors?page=${page}&size=${size}&onlyActive=${onlyActive}`)
  }

  getDebtsForDebtor(page: number, size: number, onlyActive: boolean): Observable<Page<DebtDTO>> {
    return this.http.get<Page<DebtDTO>>(this.baseUrl + `/api/debt/debtors?page=${page}&size=${size}&onlyActive=${onlyActive}`)
  }

  getDebtsCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/debt/count`)
  }

  getCreditCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/credit/count`)
  }

  addDebt(debtRequest: DebtRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl + `/api/debt`, debtRequest)
  }
}
