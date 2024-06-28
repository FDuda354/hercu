import { Component, HostListener, OnInit } from '@angular/core';
import { DebtStatus } from '../../models/debt-dto';
import { ActivatedRoute } from '@angular/router';
import { DebtService } from '../../../../services/debt.service';
import { Page } from '../../models/page';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../../../services/transaction.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Debt } from '../../models/debt';
import { CustomerDTO } from '../../models/customer-dto';
import { JwtService } from '../../../../services/auth/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-debt-details',
  templateUrl: './debt-details.component.html',
  styleUrls: ['./debt-details.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DebtDetailsComponent implements OnInit {
  id: string | null = null;
  debt: Debt = {}
  transactions!: Transaction[]
  totalRecords: number = 0;
  rows: number = 5;
  currentPage = 0;
  isLoading: boolean = true;
  isMobileVisible = false;
  skeletonTransactions: any[] = [1, 2, 3, 4, 5];
  profileImage = 'assets/images/user.png';
  user!: CustomerDTO;
  pay: boolean = false;
  loadError: boolean = false;
  inDialog: boolean = false;
  protected readonly DebtStatus = DebtStatus;

  constructor(
    private route: ActivatedRoute,
    private debtService: DebtService,
    private transactionService: TransactionService,
    private messageService: MessageService,
    private jwtService: JwtService,
    private confirmationService: ConfirmationService
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isMobileVisible = window.innerWidth <= 768;
    this.user = JSON.parse(<string>this.jwtService.getCustomer());


    if (this.id) {
      this.loadDebt(this.id)
      this.loadTransaction(this.id, 0, 10)
    }

  }

  private loadDebt(id: string) {
    this.debtService.getDebtById(id).subscribe({
      next: (debt: Debt) => {
        this.debt = debt
      },
      error: (error: HttpErrorResponse) => {

        this.loadError = true
        console.error('Error loading customers', error);
        if (error.status == 403) {
          window.location.href = 'https://pl.redtube.com';
        }

      }
    });
  }

  private loadTransaction(id: string, page: number, size: number) {
    this.isLoading = true;
    this.transactionService.getTransactionsByDebtId(id, page, size).subscribe({
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

  onPageChange(event: any) {
    if (this.id) {
      this.isLoading = true;
      this.currentPage = event.page;
      this.loadTransaction(this.id, event.page, event.rows);
    }
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

  paymentAdded($event: void) {
    this.isLoading = true;
    this.pay = false;
    if (this.id) {
      this.loadDebt(this.id)
      this.loadTransaction(this.id, 0, 10)
    }
    this.showSuccess('Sukces', 'Udało się dodać transakcje')
  }

  cancelDebt(id: number | undefined) {
    if (id == null)
      return
    if (this.inDialog) {
      return
    }
    this.inDialog = true;
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz anulować dług?',
      header: 'Anulowanie Długu',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.debtService.cancelDebtById(id).subscribe({
          next: () => {
            this.loadDebt(String(id));
            this.showSuccess('Sukces', 'Anulowano dług')
            this.inDialog = false;
          },
          error: (error: HttpErrorResponse) => {
            this.loadError = true
            console.error('Error loading customers', error);
            this.showError('Błąd servera', 'Nie udało się anulować długu')

            if (error.status == 403) {
              window.location.href = 'https://pl.redtube.com';
            }
            this.inDialog = false;
          }
        });
      },
      reject: () => {
        this.inDialog = false;
      },
      key: 'deleteConfirmDialog'
    });


  }

  reactiveDebt(id: number | undefined) {
    if (id == null)
      return
    if (this.inDialog) {
      return
    }
    this.inDialog = true;
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz przywrócić dług?',
      header: 'Przywrócenie Długu',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.debtService.reactiveDebtById(id).subscribe({
          next: () => {
            this.loadDebt(String(id));
            this.showSuccess('Sukces', 'Przywrócono dług')
            this.inDialog = false;
          },
          error: (error: HttpErrorResponse) => {
            this.loadError = true
            console.error('Error loading customers', error);
            this.showError('Błąd servera', 'Nie udało się przywrócić długu')

            if (error.status == 403) {
              window.location.href = 'https://pl.redtube.com';
            }
            this.inDialog = false;
          }
        });
      },
      reject: () => {
        this.inDialog = false;
      },
      key: 'deleteConfirmDialog'
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

  showSuccess(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'success',
      summary: title,
      detail: content,
      life: 5000
    });
  }

  getConfirmStyle() {
    return {
      'width': this.isMobileVisible ? '95vw' : '50vw',
    };
  }
}
