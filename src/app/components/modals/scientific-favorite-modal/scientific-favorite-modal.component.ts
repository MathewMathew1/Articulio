import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-favorite-scientific-modal',
  templateUrl: './scientific-favorite-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FavoriteModalComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() note = '';
  @Input() doi = '';
  @Input() downloadUrl = '';
  
  @Output() save = new EventEmitter<{ 
    title: string; 
    description: string; 
    note: string; 
    doi?: string; 
    downloadUrl?: string;
  }>();
  
  @Output() close = new EventEmitter<void>();
  @Input() isUpdate = false;

  saveChanges() {
    this.save.emit({
      title: this.title,
      description: this.description,
      note: this.note,
      doi: this.doi,
      downloadUrl: this.downloadUrl
    });
  }
}

