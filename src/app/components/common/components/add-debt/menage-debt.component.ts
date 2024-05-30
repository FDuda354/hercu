import { Component, Input, OnInit } from '@angular/core';
import { DebtRequest } from './debt-request';
import { MessageService } from 'primeng/api';
import { JwtService } from '../../../../services/auth/jwt.service';
import { CustomerDTO } from '../../models/customer-dto';
import { DebtService } from '../../../../services/debt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menage-debt',
  templateUrl: './menage-debt.component.html',
  styleUrls: ['./menage-debt.component.scss'],
  providers: [MessageService]
})
export class MenageDebtComponent implements OnInit {

  email!: string;
  withEndDate: boolean = false;
  date: Date = new Date();
  minDate!: Date;
  pl!: any;
  invalidDates!: Array<Date>
  @Input() isDebt!: boolean;
  amount!: number;
  desc!: string;
  isWorking: boolean = false;

  constructor(
    private messageService: MessageService,
    private debtService: DebtService,
    private jwtService: JwtService,
    private router: Router,
  ) {
  }

  ngOnInit() {
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
      debtorEmail: this.isDebt ? this.email : user.email,
      creditorEmail: this.isDebt ? user.email : this.email,
      amount: this.amount,
      description: this.desc,
      repaymentDate: this.withEndDate ? this.date : null,
    }
    if (!this.requestValidated(debtRequest)) {
      this.showWarn('Błąd', 'Sprawdź poprawność danych');
      this.isWorking = false;
      return;
    }

    this.debtService.addDebt(debtRequest).subscribe({
      next: () => {
        this.isWorking = false;
        this.showSuccess('Sukces', 'Udało się dodać dług!');
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error.status)
        if (error.status == 404) {
          this.isWorking = false;
          this.showWarn('DANE', 'Podany użytkownik nie istnieje');
        } else {
          this.isWorking = false;
          this.showError('Błąd servera', 'Wystąpił błąd serwera');
        }

      }
    });
  }

  private requestValidated(debtRequest: DebtRequest) {
    const email = this.isDebt ? debtRequest.debtorEmail : debtRequest.creditorEmail

    if (email == undefined || !this.isEmailValid(email)) {
      return false;
    }
    if (debtRequest.amount == undefined || debtRequest.amount <= 0) {
      return false
    }

    return true;
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

  showSuccess(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: title,
      detail: content,
      life: 5000
    });
  }


}
