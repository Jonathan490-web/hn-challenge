import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { environment } from '../../environments/environment';

describe('StoryService', () => {
  let svc: StoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(StoryService);
    http = TestBed.inject(HttpTestingController);
  });

  it('builds query params and returns result', () => {
    svc.getNewest('foo', 2, 10).subscribe(res => {
      expect(res.page).toBe(2);
      expect(res.pageSize).toBe(10);
    });

    const req = http.expectOne(r =>
      r.url === `${environment.apiBase}/stories`
      && r.params.get('q')==='foo'
      && r.params.get('page')==='2'
      && r.params.get('pageSize')==='10'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ items: [], total: 0, page: 2, pageSize: 10 });
  });
});
