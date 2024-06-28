import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Page } from '../../common/models/page';
import { CustomerDTO } from '../../common/models/customer-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getFriendsForCustomer(page: number, size: number) {
    return this.http.get<Page<CustomerDTO>>(this.baseUrl + `/api/customers/friends?page=${page}&size=${size}`)

  }

  addFriend(email: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + `/api/customers/friend?email=${email}`, null)
  }
}
