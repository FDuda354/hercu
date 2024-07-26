import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CustomerDTO, Role } from '../../common/models/customer-dto';
import { JwtService } from '../../../services/auth/jwt.service';
import { CustomerService } from '../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunicationService } from '../../../services/communication.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { Notification, Status } from '../../common/models/notification';
import { DebtStatus } from '../../common/models/debt-dto';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  providers: [MessageService]

})
export class HeaderBarComponent implements OnInit, OnDestroy {
  @Input() isMobileVisible!: boolean;
  @Input() menuItems!: Array<MenuItem>;
  protected readonly Role = Role;
  user!: CustomerDTO;
  profileImage = 'assets/images/user.png';
  private profileImageSubscription: Subscription;
  private notificationsSubscription: Subscription;
  notifications: Notification[] = [];
  items: Array<MenuItem> = [
    {
      label: 'Znajomi',
      icon: 'pi pi-users',
      routerLink: 'friends',
    },
    {
      label: 'Ustawienia',
      icon: 'pi pi-cog',
      routerLink: 'settings',
    },
    {
      separator: true,
    },
    {
      label: 'Wyloguj się',
      icon: 'pi pi-sign-out',
      command: () => {
        this.jwtService.removeCustomer();
        this.jwtService.removeToken();
        this.notificationService.onUserLogout();
      },
      routerLink: 'login',
    }
  ];

  constructor(
    private jwtService: JwtService,
    private customerService: CustomerService,
    private communicationService: CommunicationService,
    private notificationService: NotificationService,
    private messageService: MessageService,
  ) {
    this.profileImageSubscription = this.communicationService.on('reloadProfileImage').subscribe(() => {
      this.loadCustomerImage().then(url => {
        this.profileImage = url;
      });
    });
    this.notificationsSubscription = this.notificationService.notifications$.subscribe(notifications => {
      this.notifications.push(notifications);
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadCustomerImage().then(url => {
      this.profileImage = url;
    });
    this.getLastNotifications();
    this.getUnreadNotificationsNumber();
  }

  ngOnDestroy(): void {
    this.profileImageSubscription.unsubscribe();
    this.notificationsSubscription.unsubscribe();
  }

  loadCustomerImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.customerService.getCustomerImage().subscribe({
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading image:', error);
          resolve('assets/images/user.png');
        }
      });
    });
  }

  private loadUser() {
    this.customerService.getCustomerDetails().subscribe({
      next: (customerDto: CustomerDTO) => {
        this.user = customerDto;
      },
      error: error => {
        this.user = JSON.parse(<string>this.jwtService.getCustomer());
      }
    });
  }

  private getLastNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      error: error => {
        this.showError('Błąd servera', 'Nie udało się pobrać powiadomień');
      }
    });
  }

  getUnreadNotificationsNumber() {
    return this.notifications.filter(notification => notification.status === Status.UNREAD).length;
  }


  toggleNotifications() {
      this.notificationService.readNotifications().subscribe({
        next: () => {
          this.getLastNotifications();
        },
        error: error => {
          this.showError('Błąd servera', 'Nie udało się przeczytać powiadomień');
        }
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

  protected readonly DebtStatus = DebtStatus;

  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.getLastNotifications();
      },
      error: error => {
        this.showError('Błąd servera', 'Nie udało się usunąć powiadomienia');
      }
    });
  }
}
