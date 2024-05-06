import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeSummaryService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDebtAmountSum(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/debt`)
  }
  getCreditorAmountSum(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `/api/debt/summary/credit`)
  }

}
