import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CustomerDTO } from '../../common/models/customer-dto';
import { JwtService } from '../../../services/auth/jwt.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit{

  user!: CustomerDTO;

  constructor(
    private jwtService: JwtService,
  ) {
  }

  ngOnInit(): void {
    // this.user = this.jwtService.getCustomer()
    // console.log(this.user.email)
    // console.log(this.user)
    // console.log(this.user.id)
    // console.log(this.user.age)
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
      routerLink: 'login',
    }
  ];

}
