import {Component, HostListener, OnInit} from '@angular/core';
import { Transaction } from '../../common/models/transaction';
import {TransactionService} from "../../../services/transaction.service";
import {MessageService} from "primeng/api";
import {Page} from "../../common/models/page";
import {DebtStatus} from "../../common/models/debt-dto";
import { JwtService } from '../../../services/auth/jwt.service';
import { CustomerDTO } from '../../common/models/customer-dto';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [MessageService]
})
export class TransactionsComponent implements OnInit{
  transactions: Transaction[] = [];
  isMobileVisible = false;
  isLoading = true;
  skeletonTransactions: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  totalRecords: number = 0;
  rows: number = 10;


  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
    private jwtService: JwtService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 1050;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 1050;
    this.loadTransaction(0, 15)

  }

  private loadTransaction(page: number, size: number) {
    this.isLoading = true;
    this.transactionService.getTransactionsByCustomerId(page, size).subscribe({
      next: (page: Page<Transaction>) => {
        this.transactions = page.content;
        this.totalRecords = page.totalElements;
        this.rows = page.size;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading transactions', error);
        this.isLoading = false;
        this.showError('Błąd Servera', 'Nie udało się pobrać transakcji');
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

  getDebtStatus(status: DebtStatus | undefined): string {
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

  onPageChange(event: any) {
    this.isLoading = true;
    this.loadTransaction(event.page, event.rows);
  }

  isOwner(id: number | undefined) {
   const user: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());
   return id == user.id;
  }
}
