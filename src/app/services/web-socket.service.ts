import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { JwtService } from './auth/jwt.service';
import { environment } from '../../environments/environment';
import { CustomerDTO } from '../components/common/models/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private notificationSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public notifications$ = this.notificationSubject.asObservable();
  private stompClient!: Client;

  constructor(private jwtService: JwtService) {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const socket = new SockJS(`${environment.api.baseUrl}/ws`);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {Authorization: `Bearer ${this.jwtService.getToken()}`},
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      }
    });

    this.stompClient.onConnect = (frame) => {
      const user: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());
      console.log(user)
      this.stompClient.subscribe('/all/messages', (message: IMessage) => {
        this.handleMessage(message.body);
      });
      this.stompClient.subscribe(`/user/${user.email}/one/messages`, (message: IMessage) => {
        this.handleMessage(message.body);
      });

    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  public disconnectWebSocket() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  public reconnectWebSocket() {
    this.disconnectWebSocket();
    this.initializeWebSocketConnection();
  }

  public clearNotifications() {
    this.notificationSubject.next([]);
  }

  private handleMessage(message: string) {
    const currentNotifications = this.notificationSubject.value;
    this.notificationSubject.next([...currentNotifications, message]);
  }


}
