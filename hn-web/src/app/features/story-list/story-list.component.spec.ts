import { TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { StoryService } from '../../core/story.service';
import { of } from 'rxjs';

describe('StoryListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryListComponent],
      providers: [{
        provide: StoryService,
        useValue: { getNewest: () => of({ items: [], total: 0, page: 1, pageSize: 20 }) }
      }]
    }).compileComponents();
  });

  it('renders', () => {
    const fixture = TestBed.createComponent(StoryListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Newest Hacker News');
  });
});
