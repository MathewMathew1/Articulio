import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [CommonModule],
})
export class UiButtonComponent {
  @Input() color: 'gray' | 'blue' | 'red' | 'green' | 'black' | 'white' | 'default' = 'default';
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() small: boolean = false;
  @Input() disabled: boolean = false;
  @Input() class = '';
}
