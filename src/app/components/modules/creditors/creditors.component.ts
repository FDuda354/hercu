import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Page } from '../../common/models/page';
import { DebtDTO } from '../../common/models/debt-dto';
import { DebtService } from '../../../services/debt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.scss'],
  providers: [MessageService]
})
export class CreditorsComponent implements OnInit {
  protected readonly Component = Component;
  display: boolean = false;
  isMobileVisible = false;
  debts: DebtDTO[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  currentPage = 0;
  isLoading: boolean = true;
  loadError: boolean = false;
  onlyActive: boolean = true;

  constructor(
    private debtService: DebtService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
    this.loadDebts(0, this.rows);
  }

  loadDebts(page: number, size: number) {
    this.isLoading = true;
    this.debtService.getDebtsForDebtor(page, size, this.onlyActive).subscribe({
      next: (page: Page<DebtDTO>) => {
        this.debts = page.content;
        this.totalRecords = page.totalElements;
        this.rows = page.size;
        this.isLoading = false;

      },
      error: error => {
        console.error('Error loading customers', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać danych')
        this.loadError = true;
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.page;
    this.loadDebts(event.page, event.rows);
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


  goToDetails(debtId: number | undefined) {
    this.router.navigate(['/debt', debtId]);
  }

  creditAdded($event: void) {
    this.isLoading = true;
    this.display = false;
    this.loadDebts(0, 5);
    this.showSuccess('Sukces', 'Udało się dodać Wierzyciela!');

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

