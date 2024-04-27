import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-default',
  templateUrl: './default-component.html',
  styleUrls: ['./default-component.scss']
})
export class DefaultComponent implements OnInit {
  isMobileVisible = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  menuItems: Array<MenuItem> = [
    {
      label: 'Pulpit', icon: 'pi pi-home',
      url: '',
      routerLink: '',
    },
    {
      label: 'Dłużnicy', icon: 'pi pi-users',
      url: 'debtors',
      routerLink: 'debtors',
    },
    {
      label: 'Wierzyciele', icon: 'pi pi-users',
      url: 'creditors',
      routerLink: 'creditors',
    },
    {
      label: 'Transakcje', icon: 'pi pi-wallet',
      url: 'transactions',
      routerLink: 'transactions',
    },
    {
      label: 'Ustawienia', icon: 'pi pi-cog',
      url: 'settings',
      routerLink: 'settings',
    }
  ];

}
