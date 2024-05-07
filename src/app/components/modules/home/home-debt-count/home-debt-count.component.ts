import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../../services/debt.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-debt-count',
  templateUrl: './home-debt-count.component.html',
  styleUrls: ['./home-debt-count.component.scss'],
  providers: [MessageService]
})
export class HomeDebtCountComponent implements OnInit {
  debtSummary: number = 0;
  creditSummary: number = 0;
  isLoading: boolean = true;
  debtCountSummary: number = 0;
  creditCountSummary: number = 0;
  balance: number = 0;

  constructor(
    private debtService: DebtService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.loadDebtCountSummary();
    this.loadCreditCountSummary();
    this.loadDebtSummary();
    this.loadCreditSummary();
  }

  loadDebtSummary() {
    this.debtService.getDebtAmountSum().subscribe({
      next: (debtSummary: number) => {
        this.debtSummary = debtSummary;
        this.balance -= this.debtSummary;
      },
      error: error => {
        this.isLoading = false;
        console.error('Error loading debt data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać sumy długów');
      }
    });
  }

  loadCreditSummary() {
    this.debtService.getCreditorAmountSum().subscribe({
      next: (creditSummary: number) => {
        this.creditSummary = creditSummary;
        this.balance += this.creditSummary
      },
      error: error => {
        this.isLoading = false;
        console.error('Error loading credit data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać sumy wierzycielstwa');
      }
    });
  }

  loadDebtCountSummary() {
    this.debtService.getDebtsCount().subscribe({
      next: (debtCountSummary: number) => {
        this.debtCountSummary = debtCountSummary;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading debt data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać luczby długów');
        this.isLoading = false;
      }
    });
  }

  loadCreditCountSummary() {
    this.debtService.getCreditCount().subscribe({
      next: (creditCountSummary: number) => {
        this.creditCountSummary = creditCountSummary;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading credit data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać liczby wierzycielstw');
        this.isLoading = false;
      }
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: title,
      detail: content,
      life: 10000
    });
  }

}
