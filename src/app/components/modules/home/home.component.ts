import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../common/models/transaction';
import { TransactionService } from '../../../services/transaction.service';
import { Page } from '../../common/models/page';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];


  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
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

}
