import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAIN_ROUTE_API } from '../../../constant/mainRoute';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  private readonly trackUrl = 'api/tracker/track';
  private readonly trackDownloadUrl = 'api/tracker/track/scientific/download';
  private readonly trackDoi = 'api/tracker/track/scientific/doi';

  constructor(private http: HttpClient) {}

  trackArticleView(articleUrl: string): void {
    var url =  MAIN_ROUTE_API + this.trackUrl;
    this.http
      .post(
        url,
        { articleUrl },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      .subscribe({
        next: () => {},
        error: (err) => console.error('Tracking failed', err),
      });
  }

  trackScientificArticleDownload(articleUrl: string): void {
     var url =  MAIN_ROUTE_API + this.trackDownloadUrl;
    this.http
      .post(
        url,
        { articleUrl },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      .subscribe({
        next: () => {},
        error: (err) => console.error('Tracking failed', err),
      });
  }

   trackScientificArticleDoi(articleUrl: string): void {
     var url =  MAIN_ROUTE_API + this.trackDoi;
    this.http
      .post(
        url,
        { articleUrl },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      .subscribe({
        next: () => {},
        error: (err) => console.error('Tracking failed', err),
      });
  }
}
