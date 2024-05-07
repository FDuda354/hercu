import { Component } from '@angular/core';
import { CustomerRegistrationRequest } from './registration-form/customer-registration-request';
import { Gender } from '../../common/models/customer-dto';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  errorMsg = 'error';
  customer: CustomerRegistrationRequest = {
    age: 0, email: '', firstName: '', gender: Gender.HELICOPTER, password: '', surname: ''

  }

  createAccount() {

  }
}
