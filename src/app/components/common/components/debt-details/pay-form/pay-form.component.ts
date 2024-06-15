import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Debt } from '../../../models/debt';
import { ValidateResp } from '../../../models/ValidateResp';
import { MessageService } from 'primeng/api';
import { TransactionService } from '../../../../../services/transaction.service';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss'],
  providers: [MessageService]
})
export class PayFormComponent {
  @Input() debt!: Debt;
  @Output() paymentAdded = new EventEmitter<void>();
  amount!: number;
  desc!: string;
  isWorking: boolean = false;


  constructor(
    private messageService: MessageService,
    private transactionService: TransactionService
  ) {
  }

  pay() {
    if (this.isWorking) {
      return
    }
    this.isWorking = true;
    const transactionRequest: TransactionRequest = {
      debtId: this.debt.id,
      amount: this.amount,
      description: this.desc == undefined ? '' : this.desc,
    }
    let validateResp = this.requestValidated(transactionRequest);

    if (!validateResp.isValid) {
      if (!validateResp.isAmountValid) {
        this.showWarn('Błąd', 'Niepoprawna wartośc transakcji');
      }
      if (!validateResp.isDescValid) {
        this.showWarn('Błąd', 'Za długi opis (max 100 znaków)');
      }
      this.isWorking = false;
      return;
    }

    this.transactionService.addTransaction(transactionRequest).subscribe({
      next: () => {
        this.isWorking = false;
        this.paymentAdded.emit();
      },
      error: error => {
        this.isWorking = false;
        this.showError('Błąd servera', 'Wystąpił błąd serwera');

      }
    });

  }

  private requestValidated(transactionRequest: TransactionRequest): ValidateResp {
    let validateResponse: ValidateResp = {
      isValid: false,
      isEmailValid: true,
      isEmailTheSame: false,
      isAmountValid: true,
      isDescValid: true,
    }
    // @ts-ignore
    if (transactionRequest.amount == undefined || transactionRequest.amount <= 0 || transactionRequest.amount > 1_000_000_000 || transactionRequest.amount > this.debt.amount) {
      validateResponse.isAmountValid = false;
    }
    if (transactionRequest.description == undefined || transactionRequest.description.length > 100) {
      validateResponse.isDescValid = false;
    }

    if (validateResponse.isAmountValid && validateResponse.isDescValid) {
      validateResponse.isValid = true;
    }

    return validateResponse;
  }

  showWarn(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'warn',
      summary: title,
      detail: content,
      life: 5000
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: title,
      detail: content,
      life: 5000
    });
  }

}

export interface TransactionRequest {
  debtId?: number,
  amount: number,
  description: string,
}
