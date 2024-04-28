import { Component } from '@angular/core';
import { AuthRequest } from '../../../../services/models/auth-request';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  authRequest: AuthRequest = {};
}
