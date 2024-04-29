import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomerDTO} from "../../models/customer-dto";

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input() type!: string;
  @Input() customer: CustomerDTO = {};
  @Input() customerIndex = 0;
  @Output() details: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>();

  onDetails() {
    this.details.emit(this.customer);
  }

  get customerImage(): string {
    return `https://randomuser.me/api/portraits/men/1.jpg`;
  }
}
