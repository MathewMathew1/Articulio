import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-read-modal',
  templateUrl: 'to-read-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ToReadModalComponent {
  @Input() title = '';
  @Input() description = '';
  @Output() save = new EventEmitter<{ title: string; description: string }>();
  @Output() close = new EventEmitter<void>();
  @Input() isUpdate = false;

  saveChanges() {
    this.save.emit({ title: this.title, description: this.description });
  }
}
