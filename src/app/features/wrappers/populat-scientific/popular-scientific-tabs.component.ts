import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MostPopularDownloadedScientificArticlesComponent } from '../../mostPopular/most-popular-scientific-articles/most-popular-scientific-articles.component';
import { MostPopularDoi } from '../../mostPopular/most-popular-scientific-articles-doi/most-popular-scientific-articles-doi.component';


@Component({
  selector: 'app-popular-scientific-tabs',
  templateUrl: './popular-scientific-tabs.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MostPopularDoi,
    MostPopularDownloadedScientificArticlesComponent,
  ],
})
export class PopularScientificTabsComponent {
  activeTab: 'downloads' | 'doi' = 'downloads';
  isCollapsed = false;

  setTab(tab: 'downloads' | 'doi') {
    this.activeTab = tab;

  }
}
