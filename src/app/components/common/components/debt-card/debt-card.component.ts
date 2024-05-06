import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DebtDTO } from '../../models/debt-dto';

@Component({
  selector: 'app-debt-card',
  templateUrl: './debt-card.component.html',
  styleUrls: ['./debt-card.component.scss']
})
export class DebtCardComponent {
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
