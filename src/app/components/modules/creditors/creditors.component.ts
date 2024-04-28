import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.scss']
})
export class CreditorsComponent implements OnInit {
  display: boolean = false;
  isMobileVisible = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  protected readonly Component = Component;
}
