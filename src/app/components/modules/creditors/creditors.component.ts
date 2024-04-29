import { Component, HostListener, OnInit } from '@angular/core';
import { CustomerDTO } from '../../common/models/customer-dto';
import { CustomerService } from '../../../services/customer.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Page } from '../../common/models/page';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.scss'],
  providers: [MessageService]
})
export class CreditorsComponent implements OnInit {
  display: boolean = false;
  isMobileVisible = false;
  customers: CustomerDTO[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
    this.primengConfig.ripple = true;
    this.loadCustomers(0, this.rows);
  }

  loadCustomers(page: number, size: number) {
    this.customerService.getDebtors(page, size).subscribe({
      next: (page: Page<CustomerDTO>) => {
        this.customers = page.content;
        this.totalRecords = page.totalElements;
        this.rows = page.size;
      },
      error: error => {
        console.error('Error loading customers', error);
        this.showIncorrectLogin()
      }
    });
  }

  onPageChange(event: any) {
    this.loadCustomers(event.page, event.rows);
  }

  showIncorrectLogin() {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Błąd Servera',
      detail: 'Nie udało się pobrać danych',
      life: 10000

    });
  }

  protected readonly Component = Component;

  deleteCustomer(customer: CustomerDTO) {

  }
}

