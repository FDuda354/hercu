import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Notification } from '../components/common/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly baseUrl = `${environment.api.baseUrl}`;

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService
  ) {
  }

  get notifications$() {
    return this.webSocketService.notifications$;
  }

  onUserLogout() {
    this.webSocketService.disconnectWebSocket();
    this.webSocketService.clearNotifications();
  }

  getUnreadNotificationsCount() {
    return this.http.get<number>(this.baseUrl + `/api/notification/user/unread/count`)

  }

  getNotifications() {
    return this.http.get<Notification[]>(this.baseUrl + `/api/notification/last/user`)

  }
}
