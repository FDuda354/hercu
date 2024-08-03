import { Component, OnInit } from '@angular/core';
import { AuthRequest } from '../../../../services/auth/models/auth-request';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { JwtService } from '../../../../services/auth/jwt.service';
import { WebSocketService } from '../../../../services/web-socket.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService]
})
export class LoginFormComponent implements OnInit {

  authRequest: AuthRequest = {};
  isWorking: boolean = false;

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private jwtService: JwtService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
  }

  login() {
    if (this.authRequest.username == null || this.authRequest.password == null) {
      this.showWarn('XD', 'Może byś coś wpisał najpierw');
      return
    }
    if (this.isWorking) {
      return
    }
    this.isWorking = true;
    this.authenticationService.login(this.authRequest).subscribe({
      next: (response) => {
        this.jwtService.setToken(response.token)
        this.jwtService.setCustomer(response.customerDTO)
        this.webSocketService.reconnectWebSocket()
        this.router.navigate([''])
        this.isWorking = false;
      },
      error: (err) => {
        if (err.error.status === 401) {
          this.showError('Niepoprawne logowanie', 'Nieprawidłowy login lub hasło');
        } else {
          this.showError('Błąd', 'Wystąpił błąd serwera');
        }
        this.isWorking = false;
      }
    })
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: title,
      detail: content
    });
  }

  showWarn(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'warn',
      summary: title,
      detail: content,
      life: 5000
    });
  }
}
