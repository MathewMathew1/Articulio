import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStoreService } from '../../core/services/authStoreService';
import { Subscription } from 'rxjs';
import { ToReadScientificArticlesService } from '../../core/services/apiServices/to-read-scientific-articles.service';
import { FavoriteScientificArticlesService } from '../../core/services/apiServices/favorite-scientific-articles-service';
import { ScientificArticle } from '../../../types/scientificArticles';

@Component({
  selector: 'app-scientific-dropdown',
  templateUrl: 'scientific-article-dropdown.html',
  styleUrls: ['./scientific-article-dropdown.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FavoriteDropdownComponent implements OnInit {
  @Output() showModal = new EventEmitter<void>();
  @Output() showToReadModal = new EventEmitter<void>();
  @Input() article!: ScientificArticle;
  @Output() favoriteToggled = new EventEmitter<boolean>();

  favoriteId: string | null = null;
  toReadId: string | null = null;
  dropdownOpen = false;
  title = '';
  description = '';

  constructor(
    private authStore: AuthStoreService,
    private favoriteArticlesService: FavoriteScientificArticlesService,
    private readArticlesService: ToReadScientificArticlesService,
    private eRef: ElementRef
  ) {}

  private userSubscription?: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authStore.user$.subscribe((user) => {
      if (!user) {
        this.favoriteId = null;
        this.toReadId = null;
        return;
      }

      const favMatch = user.favoriteScientificArticles?.find(
        (fav) => fav.url === this.article.url
      );
      const toReadMatch = user.toReadScientificArticles?.find(
        (entry) => entry.url === this.article.url
      );

      this.favoriteId = favMatch ? favMatch.id : null;
      this.toReadId = toReadMatch ? toReadMatch.id : null;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.favoriteId) {
      this.favoriteArticlesService.deleteFavorite(this.favoriteId).subscribe({
        next: () => {
          console.log('Delete request successful');
          this.dropdownOpen = false;
        },
        error: (err) => {
          console.error('Delete request failed', err);
        },
      });
      return;
    }
    this.showModal.emit();
    this.dropdownOpen = false;
  }

  onToReadClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.toReadId) {
      this.readArticlesService.deleteToRead(this.toReadId).subscribe({
        next: () => {
          console.log('Delete request successful');
          this.dropdownOpen = false;
        },
        error: (err) => {
          console.error('Delete request failed', err);
        },
      });
      this.dropdownOpen = false;
      return;
    }
    this.showToReadModal.emit();
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
