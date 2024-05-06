import { Debt } from './debt';

export interface Transaction {
  id?: number,
  debt?: Debt,
  amount?: number,
  balanceBeforeTransaction?: number,
  balanceAfterTransaction?: number,
  description?: string,
  paymentDate?: Date,
}
