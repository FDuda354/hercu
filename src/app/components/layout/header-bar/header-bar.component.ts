import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerDTO, Role } from '../../common/models/customer-dto';
import { JwtService } from '../../../services/auth/jwt.service';
import { CustomerService } from '../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  user!: CustomerDTO;
  profileImage = 'assets/images/user.png';

  constructor(
    private jwtService: JwtService,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.jwtService.getCustomer());
    this.loadCustomerImage(this.user?.profileImage).then(url => {
      this.profileImage = url;
    });
  }


  @Input() isMobileVisible!: boolean;
  @Input() menuItems!: Array<MenuItem>;
  items: Array<MenuItem> = [
    {
      label: 'Profil',
      icon: 'pi pi-user',
      routerLink: '',
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

  protected readonly Role = Role;

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
          console.error('Error loading image:', error);
          resolve('assets/images/user.png');
        }
      });
    });
  }
}
