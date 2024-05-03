import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerDTO } from '../../common/models/customer-dto';
import { JwtService } from '../../../services/auth/jwt.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  user!: CustomerDTO;

  constructor(
    private jwtService: JwtService,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.jwtService.getCustomer());
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

}
