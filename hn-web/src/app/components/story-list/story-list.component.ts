import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HnService } from '../../services/hn.service';
import { Story } from '../../models/story';
import { PagedResult } from '../../models/paged-result';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  query = '';
  page = 1;
  pageSize = 20;
  total = 0;
  loading = false;
  items: Story[] = [];

  constructor(private hn: HnService) {}
  ngOnInit(): void { this.load(); }

  get maxPages(): number {
    const pages = Math.ceil((this.total || 0) / (this.pageSize || 1));
    return Math.max(1, pages);
  }

  load(page: number = this.page) {
    this.loading = true;
    this.page = page;
    this.hn.getNewest(this.query, this.page, this.pageSize).subscribe({
      next: (r: PagedResult<Story>) => {
        this.items = r.items; this.total = r.total;
        this.page = r.page; this.pageSize = r.pageSize; this.loading = false;
      },
      error: _ => { this.loading = false; }
    });
  }

  search() { this.page = 1; this.load(1); }
  next() { if (this.page < this.maxPages) this.load(this.page + 1); }
  prev() { if (this.page > 1) this.load(this.page - 1); }
  trackById(_: number, s: Story) { return s.id; }
}
