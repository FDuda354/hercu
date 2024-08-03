import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-default',
  templateUrl: './default-component.html',
  styleUrls: ['./default-component.scss']
})
export class DefaultComponent implements OnInit {


  ngOnInit(): void {
  }

  menuItems: Array<MenuItem> = [
    {
      label: 'Pulpit', icon: 'pi pi-home',
      url: '',
      routerLink: '/',
    },
    {
      label: 'Protokoły', icon: 'pi pi-users',
      url: 'protocols',
      routerLink: 'protocols',
    },

  ];

}
