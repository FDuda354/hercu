export interface DebtRequest {
  debtorEmail?: string,
  creditorEmail?: string,
  amount?: number,
  description?: string,
  repaymentDate?: Date | null,
}
