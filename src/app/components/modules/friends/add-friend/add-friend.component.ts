import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DebtService } from '../../../../services/debt.service';
import { JwtService } from '../../../../services/auth/jwt.service';
import { CustomerDTO } from '../../../common/models/customer-dto';
import { DebtRequest } from '../../../common/components/add-debt/debt-request';
import { ValidateResp } from '../../../common/models/ValidateResp';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent  {

  @Output() friendAdded = new EventEmitter<void>();

  email!: string;
  isWorking: boolean = false;

  constructor(
    private messageService: MessageService,
    private friendsService: FriendsService,
    private jwtService: JwtService,
  ) {
  }


  onSubmit() {
    if (this.isWorking) {
      return
    }
    this.isWorking = true;
    const user: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());

    let validateResp = this.requestValidated(user, this.email);
    if (!validateResp.isValid) {
      if (validateResp.isEmailTheSame) {
        this.showWarn('Błąd', 'Nie możesz dodać do znajomych sam na siebie');
      }
      if (!validateResp.isEmailValid) {
        this.showWarn('Błąd', 'Niepoprawny Email');
      }

      this.isWorking = false;
      return;
    }

    this.friendsService.addFriend(this.email).subscribe({
      next: () => {
        this.isWorking = false;
        this.friendAdded.emit();
      },
      error: error => {
        if (error.status == 404) {
          this.isWorking = false;
          this.showWarn('DANE', 'Podany użytkownik nie istnieje');
        } else if(error.status == 400) {
          this.isWorking = false;
          this.showError('Błąd servera', 'Masz już znajomego ' + this.email);
        } else {
          this.isWorking = false;
          this.showError('Błąd servera', 'Wystąpił błąd serwera');
        }

      }
    });
  }


  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: title,
      detail: content,
      life: 5000
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

  private requestValidated(user: CustomerDTO, email: string) {
    let validateResponse: ValidateResp = {
      isValid: false,
      isEmailValid: true,
      isEmailTheSame: false,
      isAmountValid: true,
      isDescValid: true,
    }
    if (email == undefined || !this.isEmailValid(email)) {
      validateResponse.isEmailValid = false;
    }
    if (user.email === email) {
      validateResponse.isEmailTheSame = true;
    }

    if (validateResponse.isEmailValid && !validateResponse.isEmailTheSame) {
      validateResponse.isValid = true;
    }

    return validateResponse;
  }
}
