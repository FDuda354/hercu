import { DebtDTO } from './debt-dto';

export interface Transaction {
  id?: number,
  debt?: DebtDTO,
  amount?: number,
  balanceBeforeTransaction?: number,
  balanceAfterTransaction?: number,
  description?: string,
  paymentDate?: Date,
}
