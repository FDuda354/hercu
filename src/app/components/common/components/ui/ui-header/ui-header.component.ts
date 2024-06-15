import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss']
})
export class UiHeaderComponent {
  @Input() backButton!: string;
  @Input() closeButton!: string;
  @Input() showCloseButton: boolean = false;
  @Input() text: string | undefined;
}
