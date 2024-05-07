import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../../../services/auth/jwt.service';
import { CustomerService } from '../../../../services/customer.service';
import { AuthRequest } from '../../../../services/auth/models/auth-request';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [MessageService]
})
export class RegistrationFormComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(20)]],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.customerService.register(this.registerForm.value).subscribe({
        next: () => {
          const authReq: AuthRequest = {
            username: this.registerForm.get('email')?.value,
            password: this.registerForm.get('password')?.value
          }
          this.authenticationService.login(authReq)
            .subscribe({
              next: (authenticationResponse) => {
                this.jwtService.setToken(authenticationResponse.token);
                this.jwtService.setCustomer(authenticationResponse.customerDTO);
                this.router.navigate(['/']);
              },
              error: (err) => {
                console.log(err);
                this.showError('Błąd','Wystąpił błąd zalogowania');
              }
            });

        },
        error: err => {
          console.log(err);
          if (err.error.status === 409) {
            this.showError('Błąd','Podany urzytkownik już istnieje');
          }else {
            this.showError('Błąd','Wystąpił błąd podczas rejestracji');

          }

        }
      });
    }
  }

  private mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
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
