import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResult } from '../models/paged-result';
import { Story } from '../models/story';

@Injectable({ providedIn: 'root' })
export class HnService {
  constructor(private http: HttpClient) {}

  getNewest(q: string | null, page: number, pageSize: number): Observable<PagedResult<Story>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (q && q.trim().length) params = params.set('q', q.trim());
    return this.http.get<PagedResult<Story>>(`${environment.apiBase}/stories`, { params });
  }
}
