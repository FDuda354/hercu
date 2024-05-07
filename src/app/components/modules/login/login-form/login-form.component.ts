import { Component, OnInit } from '@angular/core';
import { AuthRequest } from '../../../../services/auth/models/auth-request';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { JwtService } from '../../../../services/auth/jwt.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService]
})
export class LoginFormComponent implements OnInit {

  authRequest: AuthRequest = {};

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private jwtService: JwtService,
    private router: Router,
  ) {
  }

  login() {
    this.authenticationService.login(this.authRequest).subscribe({
      next: (response) => {
        this.jwtService.setToken(response.token)
        this.jwtService.setCustomer(response.customerDTO)
        this.router.navigate([''])
      },
      error: (err) => {
        if (err.error.status === 401) {
          this.showError('Niepoprawne logowanie', 'Nieprawidłowy login lub hasło');
        } else {
          this.showError('Błąd', 'Wystąpił błąd serwera');
        }

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
}
