import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { JwtService } from '../../../services/auth/jwt.service';

import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  providers: [MessageService]

})
export class HeaderBarComponent {
  @Input() isMobileVisible!: boolean;
  @Input() menuItems!: Array<MenuItem>;

  items: Array<MenuItem> = [
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
  ) {

  }



}
