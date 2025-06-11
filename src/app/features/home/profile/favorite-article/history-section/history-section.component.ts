import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitedLink } from '../../../../../../apiResponsesType/UserData';
import { HistoryLinkComponent } from "../history-link/history-link.component";


@Component({
  selector: 'app-history-section',
  standalone: true,
  imports: [CommonModule, HistoryLinkComponent],
  templateUrl: './history-section.component.html',
})
export class HistorySectionComponent {
  @Input() visitedLinks: VisitedLink[] = [];
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
