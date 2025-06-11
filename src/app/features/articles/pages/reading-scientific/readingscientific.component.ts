import { CommonModule } from "@angular/common";
import { Output, Component, Input, EventEmitter } from "@angular/core";

@Component({
  selector: 'full-text-modal',
  templateUrl: './readingscientific.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FullTextModalComponent {
  @Input() text: string = '';
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  fontSize = 16;
  pageSize = 1200; // characters per page
  currentPage = 0;

  get totalPages(): number {
    return Math.ceil(this.text.length / this.pageSize);
  }

  get pageText(): string {
    const start = this.currentPage * this.pageSize;
    return this.text.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 0) this.currentPage--;
  }

  increaseFont(): void {
    this.fontSize += 2;
  }

  decreaseFont(): void {
    if (this.fontSize > 10) this.fontSize -= 2;
  }

  close(): void {
    this.closed.emit();
  }
}
