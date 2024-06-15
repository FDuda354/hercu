import { CustomerDTO } from './customer-dto';
import { DebtStatus } from './debt-dto';

export interface Debt {
  id?: number,
  debtor?: CustomerDTO,
  creditor?: CustomerDTO,
  amount?: number,
  staredAmount?: number,
  description?: string,
  repaymentDate?: Date,
  startDate?: Date,
  status?: DebtStatus,
}
