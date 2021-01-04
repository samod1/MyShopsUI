import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PaginatedFilteredDataSource} from '../_model/paginated-filtered-data-source';
import {SortDirection} from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  navigateFromBreadcrumb = false;
  reloadFromCache = false;

  filter: any;
  page: number;
  pageSize: number;
  totalCount: number;
  sort: string;
  sortOrder: SortDirection;
  cachedResults: any[];

  constructor(router: Router) {
    router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.reloadFromCache = this.navigateFromBreadcrumb;
        this.navigateFromBreadcrumb = false;
      } else if (evt instanceof NavigationStart) {
        if (evt.navigationTrigger === 'popstate') {
          this.navigateFromBreadcrumb = true;
        }
      }
    });
  }

  cacheDataSource(ds: PaginatedFilteredDataSource<any>): void{
    this.filter = ds.filteredQuery.filter;
    this.page = ds.getPage();
    this.pageSize = ds.getPageSize();
    this.totalCount = ds.getTotalCount();
    this.cachedResults = ds.data;
    this.sort = ds.getSort().active;
    this.sortOrder = ds.getSort().direction;
  }
}
