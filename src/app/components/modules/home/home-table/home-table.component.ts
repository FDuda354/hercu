import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../common/models/transaction';
import { DebtStatus } from '../../../common/models/debt-dto';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.scss']
})
export class HomeTableComponent implements OnInit {
  @Input() transactions!: Transaction[];
  isMobileVisible = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 1050;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 1050;
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
