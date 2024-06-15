import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [MessageService]
})
export class PasswordChangeComponent implements OnInit {

  changePasswordForm!: FormGroup;
  protected isWorking: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(20)]],
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    });
  }

  private mustMatch(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({mustMatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  changePassword() {
    if (this.isWorking) {
      return
    }
    this.isWorking = true;
    if (this.changePasswordForm.valid) {
      this.authenticationService.resetPassword(this.changePasswordForm.value).subscribe({
        next: () => {
          this.showSuccess('Sukces', 'Udało się zmienić hasło');
          this.isWorking = false;
        },
        error: err => {
            this.showError('Błąd', 'Wystąpił błąd podczas zmiany hasła');

        }
      });
    }
    this.isWorking = false;
  }

  showSuccess(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: title,
      detail: content,
      life: 5000
    });
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
