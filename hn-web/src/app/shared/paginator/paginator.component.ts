import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="paginator" *ngIf="total > pageSize">
      <button class="btn" (click)="prev()" [disabled]="page<=1" aria-label="Previous page">‹ Prev</button>
      <span class="muted">Page {{page}} / {{ totalPages }}</span>
      <button class="btn" (click)="next()" [disabled]="page>=totalPages" aria-label="Next page">Next ›</button>
    </div>
  `,
  styles: [`
    .paginator{ display:flex; gap:.75rem; align-items:center; margin-top: 16px; }
    .btn{
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
      border:1px solid var(--border); color: var(--text); padding:.5rem .8rem;
      border-radius: 10px; cursor: pointer;
    }
    .btn:hover{ border-color: var(--link); color: var(--link); }
    .btn[disabled]{ opacity:.45; cursor:not-allowed; }
  `]
})
export class PaginatorComponent {
  @Input() page = 1;
  @Input() pageSize = 20;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil((this.total || 0) / (this.pageSize || 1)));
  }
  prev() { if (this.page > 1) this.pageChange.emit(this.page - 1); }
  next() { if (this.page < this.totalPages) this.pageChange.emit(this.page + 1); }
}
