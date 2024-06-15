import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.scss']
})
export class SettingItemComponent {
  @Input() link!: string;
  @Input() enabled: boolean = true;
  @Input() icon!: string;
  @Input() text: string = '';

  constructor(
    private router: Router,
  ) {
  }

  navigateTo(link: string) {
    if(this.enabled){
      this.router.navigate([link])
    }
  }

  getCardStyle() {
    return {
      'width': '17rem',
      'height': '13rem',
      'margin-bottom': '2em',
      'background-color': !this.enabled ? '#d3d3d3' : '',
      'cursor': !this.enabled ? 'not-allowed' : 'pointer'
    };
  }
}
