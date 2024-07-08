import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerDTO, Role } from '../../common/models/customer-dto';
import { JwtService } from '../../../services/auth/jwt.service';
import { CustomerService } from '../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import {CommunicationService} from "../../../services/communication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  protected readonly Role = Role;
  user!: CustomerDTO;
  profileImage = 'assets/images/user.png';
  private profileImageSubscription: Subscription = this.communicationService.on('reloadProfileImage').subscribe(() => {
    this.loadCustomerImage().then(url => {
      this.profileImage = url;
    });
  });

  @Input() isMobileVisible!: boolean;
  @Input() menuItems!: Array<MenuItem>;
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
      },
      routerLink: 'login',
    }
  ];

  constructor(
    private jwtService: JwtService,
    private customerService: CustomerService,
    private communicationService: CommunicationService,
  ) {
  }

  ngOnInit(): void {
    this.loadUser()
    this.loadCustomerImage().then(url => {
      this.profileImage = url;
    });
  }

  ngOnDestroy(): void {
    this.profileImageSubscription.unsubscribe();
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
}
