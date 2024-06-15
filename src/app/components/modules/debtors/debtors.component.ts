import { Component, HostListener, OnInit } from '@angular/core';
import { Page } from '../../common/models/page';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DebtService } from '../../../services/debt.service';
import { DebtDTO } from '../../common/models/debt-dto';
import { JwtService } from '../../../services/auth/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss'],
  providers: [MessageService]

})
export class DebtorsComponent implements OnInit {
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
    private primengConfig: PrimeNGConfig, //TODO do usuniecia
    private jwtService: JwtService,//TODO do usuniecia
    private router: Router,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
    this.primengConfig.ripple = true;
    this.loadDebts(0, this.rows);
  }

  loadDebts(page: number, size: number) {
    this.debtService.getDebtsForCreditor(page, size, this.onlyActive).subscribe({
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

  protected readonly Component = Component;

  goToDetails(debtId: number | undefined) {
    this.router.navigate(['/debt', debtId]);
  }

  debtAdded($event: void) {
    this.isLoading = true;
    this.display = false;
    this.loadDebts(0, 5);
    this.showSuccess('Sukces', 'Udało się dodać dług!');

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
