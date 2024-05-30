import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DebtDTO } from '../../models/debt-dto';
import { CustomerService } from '../../../../services/customer.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Page } from '../../models/page';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-debt-card',
  templateUrl: './debt-card.component.html',
  styleUrls: ['./debt-card.component.scss']
})
export class DebtCardComponent implements OnInit{
  @Input() type!: string;
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
    if(customerImage == undefined){
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
          console.error('Error loading image:', error);
          resolve('assets/images/user.png');
        }
      });
    });
  }

  onDetails() {
    this.details.emit(this.debt);
  }




}
