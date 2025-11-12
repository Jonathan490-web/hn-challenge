import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search card">
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M10 4a6 6 0 1 1 0 12A6 6 0 0 1 10 4m11 17-5.2-5.2a8 8 0 1 0-1.6 1.6L21 22z"/>
      </svg>
      <input
        [formControl]="q"
        aria-label="Search titles"
        placeholder="Search titles..."
        autocomplete="off"
      />
      <button class="clear" type="button" (click)="clear()" [class.hidden]="!(q.value?.length)">
        Clear
      </button>
    </div>
  `,
  styles: [`
    .search{
      display:flex; align-items:center; gap:.75rem; padding:.65rem .85rem;
      border-radius: var(--radius);
    }
    .icon{ width:20px; height:20px; color:var(--muted); flex:0 0 auto; }
    input{
      flex:1 1 auto; background:transparent; border:0; outline:none; color:var(--text);
      font-size:1rem; padding:.35rem .25rem;
    }
    .clear{
      background:transparent; border:1px solid var(--border); color:var(--muted);
      padding:.35rem .6rem; border-radius:10px; cursor:pointer;
    }
    .clear:hover{ border-color: var(--link); color: var(--link); }
  `]
})
export class SearchBoxComponent {
  @Output() query = new EventEmitter<string>();
  q = new FormControl('');

  constructor() {
    this.q.valueChanges?.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(v => this.query.emit(v ?? ''));
  }

  clear(){
    this.q.setValue('');
    this.query.emit('');
  }
}
