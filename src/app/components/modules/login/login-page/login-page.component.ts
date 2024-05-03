import { Component, OnInit } from '@angular/core';
import { AuthRequest } from '../../../../services/auth/models/auth-request';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { JwtService } from '../../../../services/auth/jwt.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {

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
        if (err.error.status === 403) {
          this.showIncorrectLogin()
        } else {
          this.showServerError()
        }

      }
    })
  }

  showIncorrectLogin() {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Niepoprawne logowanie',
      detail: 'Nieprawidłowy login lub hasło'
    });
  }

  showServerError() {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Błąd',
      detail: 'Wystąpił błąd strony'
    });
  }
}
