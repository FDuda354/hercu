import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../../services/debt.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-debt-count',
  templateUrl: './home-debt-count.component.html',
  styleUrls: ['./home-debt-count.component.scss'],
  providers: [MessageService]
})
export class HomeDebtCountComponent implements OnInit{
  debtSummary: number = 0;
  creditSummary: number = 0;

  constructor(
    private debtService: DebtService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.loadDebtCountSummary();
    this.loadCreditCountSummary();
  }

  loadDebtCountSummary() {
    this.debtService.getDebtsCount().subscribe({
      next: (debtSummary: number) => {
        this.debtSummary = debtSummary;
      },
      error: error => {
        console.error('Error loading debt data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać luczby długów');
      }
    });
  }

  loadCreditCountSummary() {
    this.debtService.getCreditCount().subscribe({
      next: (creditSummary: number) => {
        this.creditSummary = creditSummary;
      },
      error: error => {
        console.error('Error loading credit data', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać liczby wierzycielstw');
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
