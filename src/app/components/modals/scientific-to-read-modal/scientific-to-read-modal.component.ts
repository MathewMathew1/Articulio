import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-read-scientific-modal',
  templateUrl: 'scientific-to-read-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ToReadScientificModalComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() downloadUrl?: string;
  @Input() doi?: string;
  @Output() save = new EventEmitter<{
    title: string;
    description: string;
    downloadUrl?: string;
    doi?: string;
  }>();
  @Output() close = new EventEmitter<void>();
  @Input() isUpdate = false;

  saveChanges() {
    this.save.emit({
      title: this.title,
      description: this.description,
      downloadUrl: this.downloadUrl,
      doi: this.doi,
    });
  }
}
