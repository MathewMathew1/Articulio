import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitedLink } from '../../../../../../apiResponsesType/UserData';


@Component({
  selector: 'app-history-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-link.component.html',
})
export class HistoryLinkComponent {
  @Input() link!: VisitedLink;

  get formattedDate(): string {
    return new Date(this.link.timestamp).toLocaleString();
  }
}
