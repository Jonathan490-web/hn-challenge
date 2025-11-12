import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from '../../core/story.service';
import { Story } from '../../core/models';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, PaginatorComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1>Newest Hacker News</h1>
        <div class="muted small">Fast, searchable feed</div>
      </header>

      <app-search-box (query)="onQuery($event)"></app-search-box>

      <section class="card panel">
        <ul class="list" *ngIf="!loading && stories.length">
          <li *ngFor="let s of stories; trackBy: trackById">
            <a [href]="s.link || ('https://news.ycombinator.com/item?id=' + s.id)"
               target="_blank" rel="noopener">
              {{ s.title }}
              <svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/></svg>
            </a>
          </li>
        </ul>

        <div class="skeleton" *ngIf="loading">
          <div class="bar" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]"></div>
        </div>

        <div class="empty" *ngIf="!loading && !stories.length">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
          <div>No stories found. Try a different search.</div>
        </div>
      </section>

      <app-paginator
        [page]="page" [pageSize]="pageSize" [total]="total"
        (pageChange)="onPage($event)">
      </app-paginator>
    </div>
  `,
  styles: [`
    .header{ margin: 8px 0 16px; }
    h1{ margin:0 0 4px; font-size: clamp(1.3rem, 2vw + 1rem, 2rem); }
    .small{ font-size:.9rem; }

    .panel{ margin-top: 14px; padding: 8px 0; }

    .list{ list-style:none; margin:0; padding:0; }
    .list li{ padding: 10px 14px; border-bottom:1px solid var(--border); }
    .list li:last-child{ border-bottom:0; }
    .list a{
      display:flex; gap:10px; align-items:flex-start;
    }
    .list a .ext{ width:16px; height:16px; color:var(--muted); opacity:.7; margin-top:2px; }
    .list a:hover .ext{ color:var(--link-hover); opacity:1; }

    .skeleton{ padding: 8px 14px; }
    .bar{
      height: 12px; margin: 10px 0; border-radius:8px;
      background: linear-gradient(90deg, rgba(255,255,255,.06), rgba(255,255,255,.14), rgba(255,255,255,.06));
      background-size: 200% 100%; animation: shimmer 1.2s infinite;
    }
    @keyframes shimmer{ 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

    .empty{
      display:flex; gap:12px; align-items:center; justify-content:center;
      padding: 24px; color: var(--muted);
    }
    .empty svg{ width:18px; height:18px; color: var(--muted); }
  `]
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  loading = false;

  q = '';
  page = 1;
  pageSize = 20;
  total = 0;

  constructor(private api: StoryService) {}

  ngOnInit() { this.load(); }

  onQuery(q: string) {
    this.q = q;
    this.page = 1;
    this.load();
  }

  onPage(p: number) {
    this.page = p;
    this.load();
  }

  trackById(_: number, s: Story){ return s.id; }

  private load() {
    this.loading = true;
    this.api.getNewest(this.q, this.page, this.pageSize).subscribe({
      next: res => { this.stories = res.items; this.total = res.total; this.loading = false; },
      error: _ => { this.stories = []; this.total = 0; this.loading = false; }
    });
  }
}
