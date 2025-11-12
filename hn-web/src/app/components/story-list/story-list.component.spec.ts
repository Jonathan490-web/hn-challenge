import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { of } from 'rxjs';
import { HnService } from '../../services/hn.service';

describe('StoryListComponent', () => {
  let fixture: ComponentFixture<StoryListComponent>;
  let component: StoryListComponent;
  let svcSpy: jasmine.SpyObj<HnService>;

  beforeEach(async () => {
    svcSpy = jasmine.createSpyObj('HnService', ['getNewest']);
    await TestBed.configureTestingModule({
      imports: [StoryListComponent],
      providers: [{ provide: HnService, useValue: svcSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
  });

  it('loads stories on init', () => {
    svcSpy.getNewest.and.returnValue(of({ items: [], total: 0, page: 1, pageSize: 20 }));
    fixture.detectChanges();
    expect(svcSpy.getNewest).toHaveBeenCalled();
  });
});
