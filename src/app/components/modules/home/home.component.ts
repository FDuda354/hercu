import { Component, HostListener, OnInit } from '@angular/core';
import { Transaction } from '../../common/models/transaction';
import { TransactionService } from '../../../services/transaction.service';
import { Page } from '../../common/models/page';
import { DebtDTO, DebtStatus } from '../../common/models/debt-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  isMobileVisible = false;

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 1050;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 1050;
    this.loadTransaction()
  }

  private loadTransaction() {
    this.transactionService.getTransactionsByCustomerId(0, 5).subscribe({
      next: (page: Page<Transaction>) => {
        this.transactions = page.content;
      },
      error: error => {
        console.error('Error loading customers', error);
        this.showIncorrectLogin()
      }
    });
  }

  showIncorrectLogin() {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Błąd Servera',
      detail: 'Nie udało się pobrać ostatnich transakcji',
      life: 10000

    });
  }

  getDebtStatus(status: DebtStatus): string {
    switch (status) {
      case DebtStatus.ACTIVE:
        return 'AKTYWNY';
      case DebtStatus.FINISHED:
        return 'ZAKOŃCZONY';
      case DebtStatus.CANCELLED:
        return 'ANULUWANY';
      case DebtStatus.ARCHIVED:
        return 'ZARCHYWIZOWANY';
      default:
        return '';
    }
  }
}
