import {Component, Input} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

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
