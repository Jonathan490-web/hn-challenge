import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PagedResult, Story } from './models';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private base = `${environment.apiBase}/stories`;
  constructor(private http: HttpClient) {}

  getNewest(q = '', page = 1, pageSize = 20): Observable<PagedResult<Story>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (q?.trim()) params = params.set('q', q.trim());
    return this.http.get<PagedResult<Story>>(this.base, { params });
  }
}
