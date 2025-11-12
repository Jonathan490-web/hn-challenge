import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HnService } from './hn.service';
import { environment } from '../../environments/environment';

describe('HnService', () => {
  let svc: HnService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(HnService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('calls /api/stories with paging', () => {
    svc.getNewest('angular', 1, 20).subscribe(r => {
      expect(r.page).toBe(1);
      expect(r.pageSize).toBe(20);
    });

    const req = http.expectOne(r =>
      r.url === `${environment.apiBase}/stories`
      && r.params.get('q') === 'angular'
      && r.params.get('page') === '1'
      && r.params.get('pageSize') === '20'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ items: [], total: 0, page: 1, pageSize: 20 });
  });
});
