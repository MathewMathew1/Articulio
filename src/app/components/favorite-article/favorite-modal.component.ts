import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FavoriteModalComponent {
  @Input() title = '';
  @Input() description = '';
  @Output() save = new EventEmitter<{ title: string; description: string, note: string }>();
  @Output() close = new EventEmitter<void>();
  @Input() isUpdate = false;
  note: string = ""

  saveChanges() {
    this.save.emit({ title: this.title, description: this.description, note: this.note });
  }
}
