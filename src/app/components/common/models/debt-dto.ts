import { CustomerDTO } from './customer-dto';

export interface DebtDTO {
  id?: number,
  customer?: CustomerDTO,
  amount?: number,
  description?: string,
  repaymentDate?: Date,
  startDate?: Date,
  status?: DebtStatus,
}

export enum DebtStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}
