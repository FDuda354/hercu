import { Component } from '@angular/core';
import { Transaction } from '../../common/models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions: Transaction[] = [];

}
