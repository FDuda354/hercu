import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerDTO } from '../../../common/models/customer-dto';
import { DebtService } from '../../../../services/debt.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FriendCardComponent implements OnInit {
  profileImage = 'assets/images/user.png';
  @Input() friend!: CustomerDTO;
  balance: number = 0;
  isMobileVisible = false;
  inDialog: boolean = false;
  @Output() friendRemoved = new EventEmitter<number>();

  constructor(
    private customerService: CustomerService,
    private debtService: DebtService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;

    this.loadCustomerImage(this.friend.profileImage).then(url => {
      this.profileImage = url;
    });

    this.getBalance(this.friend.id);
  }

  loadCustomerImage(customerImage: string | undefined): Promise<string> {
    if (customerImage == undefined) {
      return Promise.resolve('assets/images/user.png');
    }
    return new Promise((resolve, reject) => {
      this.customerService.getCustomerImage(customerImage).subscribe({
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error: HttpErrorResponse) => {
          resolve('assets/images/user.png');
        }
      });
    });
  }

  deleteFriend(id: number | undefined) {
    if (id === undefined) {
      return;
    }
    if (this.inDialog) {
      return
    }
    this.inDialog = true;
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć znajomego? Już go nie lubisz? :(',
      header: 'Usuwanie znajomego',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.customerService.deleteFriend(id).subscribe({
          next: () => {
            this.friendRemoved.emit(id)
            this.inDialog = false;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error loading customers', error);
            this.showError('Błąd servera', 'Nie udało się usunąć znajomego')

            this.inDialog = false;
          }
        });
      },
      reject: () => {
        this.inDialog = false;
      },
      key: 'deleteConfirmDialog'
    });


  }

  private getBalance(friendId: number) {
    this.debtService.getFriendBalance(friendId).subscribe({
      next: (balance) => {
        this.balance = balance;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading customers', error);
        this.showError('Błąd servera', 'Nie udało się przywrócić długu')

      }
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: title,
      detail: content,
      life: 10000

    });
  }

  getConfirmStyle() {
    return {
      'width': this.isMobileVisible ? '95vw' : '50vw',
    };
  }
}
