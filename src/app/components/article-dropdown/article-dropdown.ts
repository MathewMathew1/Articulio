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
import { ArticleMetadata } from '../../../apiResponsesType/BlogArticles';
import { FavoriteArticlesService } from '../../core/services/apiServices/favoriteArtcles-service';
import { ToReadArticlesService } from '../../core/services/apiServices/toReadArticles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: 'article-dropdown.html',
  styleUrls: ['./article-dropdown.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FavoriteDropdownComponent implements OnInit {
  @Output() showModal = new EventEmitter<void>();
  @Output() showToReadModal = new EventEmitter<void>();
  @Input() article!: ArticleMetadata;
  @Output() favoriteToggled = new EventEmitter<boolean>();

  favoriteId: string | null = null;
  toReadId: string | null = null;
  dropdownOpen = false;
  title = '';
  description = '';

  constructor(
    private authStore: AuthStoreService,
    private favoriteArticlesService: FavoriteArticlesService,
    private readArticlesService: ToReadArticlesService,
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

      const favMatch = user.favoriteArticles?.find(
        (fav) => fav.url === this.article.url
      );
      const toReadMatch = user.toReadArticles?.find(
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
