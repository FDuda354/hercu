import { Component, HostListener, OnInit } from '@angular/core';
import { CustomerDTO } from '../../common/models/customer-dto';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Page } from '../../common/models/page';
import { DebtDTO } from '../../common/models/debt-dto';
import { DebtService } from '../../../services/debt.service';
import { JwtService } from '../../../services/auth/jwt.service';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.scss'],
  providers: [MessageService]
})
export class CreditorsComponent implements OnInit {
  display: boolean = false;
  isMobileVisible = false;
  debts: DebtDTO[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  isLoading: boolean = true;

  constructor(
    private debtService: DebtService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private jwtService: JwtService,
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
    this.debtService.getDebtsForDebtor(page, size).subscribe({
      next: (page: Page<DebtDTO>) => {
        this.debts = page.content;
        this.totalRecords = page.totalElements;
        this.rows = page.size;
        this.isLoading = false;

      },
      error: error => {
        console.error('Error loading customers', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać danych')
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.isLoading = true;
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

  goToDetailsCustomer(customer: CustomerDTO) {

  }
}

