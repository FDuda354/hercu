import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { JwtService } from './auth/jwt.service';
import { environment } from '../../environments/environment';
import { CustomerDTO } from '../components/common/models/customer-dto';
import { Notification } from '../components/common/models/notification';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private notificationSubject: Subject<Notification> = new Subject<Notification>();
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
      this.stompClient.subscribe('/all/messages', (message: IMessage) => {
        this.handleMessage(JSON.parse(message.body));
      });
      this.stompClient.subscribe(`/user/${user.email}/one/messages`, (message: IMessage) => {

        this.handleMessage(JSON.parse(message.body));
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


  private handleMessage(message: Notification) {
    this.notificationSubject.next(message);
  }


}
