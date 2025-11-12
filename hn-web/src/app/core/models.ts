export interface Story {
  id: number;
  title: string;
  link: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
