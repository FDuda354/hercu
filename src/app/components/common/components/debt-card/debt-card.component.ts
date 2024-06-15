import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DebtDTO, DebtStatus } from '../../models/debt-dto';
import { CustomerService } from '../../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-debt-card',
  templateUrl: './debt-card.component.html',
  styleUrls: ['./debt-card.component.scss']
})
export class DebtCardComponent implements OnInit {
  @Input() isDebt: boolean = true;
  @Input() debt: DebtDTO = {};
  @Input() customerIndex = 0;
  @Output() details: EventEmitter<DebtDTO> = new EventEmitter<DebtDTO>();
  profileImage = 'assets/images/user.png';


  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.loadCustomerImage(this.debt.customer?.profileImage).then(url => {
      this.profileImage = url;
    });
  }

  loadCustomerImage(customerImage: string | undefined): Promise<string> {
    if (customerImage == undefined) {
      return Promise.resolve('assets/images/user.png');
    }
    return new Promise((resolve, reject) => {
      this.customerService.getCustomerImage(customerImage).subscribe({
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error: HttpErrorResponse) => {
          resolve('assets/images/user.png');
        }
      });
    });
  }

  onDetails() {
    this.details.emit(this.debt);
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

}
