import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DebtDTO } from '../../models/debt-dto';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input() type!: string;
  @Input() debt: DebtDTO = {};
  @Input() customerIndex = 0;
  @Output() details: EventEmitter<DebtDTO> = new EventEmitter<DebtDTO>();

  onDetails() {
    this.details.emit(this.debt);
  }

  get customerImage(): string {
    return `https://randomuser.me/api/portraits/men/1.jpg`;
  }
}
