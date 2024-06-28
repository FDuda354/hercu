import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DebtRequest } from './debt-request';
import { MessageService } from 'primeng/api';
import { JwtService } from '../../../../services/auth/jwt.service';
import { CustomerDTO } from '../../models/customer-dto';
import { DebtService } from '../../../../services/debt.service';
import { ValidateResp } from '../../models/ValidateResp';
import { Page } from '../../models/page';
import { FriendsService } from '../../../modules/friends/friends.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-menage-debt',
  templateUrl: './menage-debt.component.html',
  styleUrls: ['./menage-debt.component.scss'],
  providers: [MessageService]
})
export class MenageDebtComponent implements OnInit {

  @Input() isDebt!: boolean;
  @Output() debtAdded = new EventEmitter<void>();

  email!: string;
  withEndDate: boolean = false;
  date: Date = new Date();
  minDate!: Date;
  pl!: any;
  invalidDates!: Array<Date>
  amount!: number;
  desc!: string;
  isWorking: boolean = false;
  canAddByFriend: boolean = false;
  friends: CustomerDTO[] = [];
  isMobileVisible = false;
  totalRecords: number = 0;
  rows: number = 10;
  currentPage = 0;
  addByFriend: boolean = true;
  friend!: CustomerDTO;

  constructor(
    private messageService: MessageService,
    private debtService: DebtService,
    private jwtService: JwtService,
    private friendsService: FriendsService,
  ) {
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.loadFriends();
    this.isMobileVisible = window.innerWidth <= 768;

    this.pl = {
      firstDayOfWeek: 1,
      dayNames: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
      dayNamesShort: ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'niedz'],
      dayNamesMin: ['P', 'W', 'S', 'C', 'P', 'S', 'N'],
      monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
      monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      today: 'Dzisiaj',
      clear: 'Wyczyść'
    }
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 1);
    this.minDate = minDate;
    let invalidDate = new Date();
    this.invalidDates = [today, invalidDate];
  }

  onSubmit() {
    if (this.isWorking) {
      return
    }
    this.isWorking = true;
    const user: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());
    const debtRequest: DebtRequest = {
      debtorEmail: this.isDebt ? (this.addByFriend && this.canAddByFriend)? this.friend?.email : this.email : user.email,
      creditorEmail: this.isDebt ? user.email : (this.addByFriend && this.canAddByFriend)? this.friend?.email : this.email,
      amount: this.amount,
      description: this.desc == undefined ? '' : this.desc,
      repaymentDate: this.withEndDate ? this.date : null,
    }
    console.log(this.addByFriend)
    console.log(this.canAddByFriend)
    console.log(debtRequest)

    let validateResp = this.requestValidated(debtRequest);
    if (!validateResp.isValid) {
      if (validateResp.isEmailTheSame) {
        this.showWarn('Błąd', 'Nie możesz założyć długu sam na siebie');
      }
      if (!validateResp.isEmailValid) {
        this.showWarn('Błąd', 'Niepoprawny Email');
      }
      if (!validateResp.isAmountValid) {
        this.showWarn('Błąd', 'Niepoprawna wartośc długu');
      }
      if (!validateResp.isDescValid) {
        this.showWarn('Błąd', 'Za długi opis (max 100 znaków)')
      }
      this.isWorking = false;
      return;
    }

    this.debtService.addDebt(debtRequest).subscribe({
      next: () => {
        this.isWorking = false;
        this.debtAdded.emit();
      },
      error: error => {
        if (error.status == 404 || error.status == 400) {
          this.isWorking = false;
          this.showWarn('DANE', 'Podany użytkownik nie istnieje');
        } else {
          this.isWorking = false;
          this.showError('Błąd servera', 'Wystąpił błąd serwera');
        }

      }
    });
  }

  private requestValidated(debtRequest: DebtRequest): ValidateResp {
    const email = this.isDebt ? debtRequest.debtorEmail : debtRequest.creditorEmail
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
    if (debtRequest.debtorEmail === debtRequest.creditorEmail) {
      validateResponse.isEmailTheSame = true;
    }
    if (debtRequest.amount == undefined || debtRequest.amount <= 0 || debtRequest.amount > 1_000_000_000) {
      validateResponse.isAmountValid = false;
    }
    if (debtRequest.description == undefined || debtRequest.description.length > 100) {
      validateResponse.isDescValid = false;
    }

    if (validateResponse.isEmailValid && validateResponse.isAmountValid && validateResponse.isDescValid && !validateResponse.isEmailTheSame) {
      validateResponse.isValid = true;
    }

    return validateResponse;
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private loadFriends() {
    this.friendsService.getAllFriendsForCustomer().subscribe({
      next: (friends: CustomerDTO[]) => {
        this.friends = friends;
        this.canAddByFriend = friends.length > 0;
      },
      error: error => {
        console.error('Error loading customers', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać danych')
      }
    });
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

}
