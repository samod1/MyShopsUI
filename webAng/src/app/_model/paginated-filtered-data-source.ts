import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FilteredQuery} from './filtered-query';
import {DataResponse} from './data-response';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EventEmitter} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {MatSort, Sort} from '@angular/material/sort';

export abstract class PaginatedFilteredDataSource<T> extends DataSource<T> {
  private dataSubject: BehaviorSubject<T[]>;
  filteredQuery: FilteredQuery;
  count = 0;
  // tslint:disable-next-line:variable-name
  private _paginator: MatPaginator;
  // tslint:disable-next-line:variable-name
  private _sort: MatSort;
  onReload = new EventEmitter();
  onStartSearch = new EventEmitter();
  onError = new EventEmitter<any>();
  reload$ = new Subject();

  protected constructor(pageSize, data?: T[]) {
    super();
    data = data || [];
    this.dataSubject = new BehaviorSubject<T[]>(data);
    this.filteredQuery = {_start: 0, _limit: pageSize, filter: {}};
    this.connectReload();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    collectionViewer.viewChange.subscribe(listRange => {
      if (this.data.length === 0) {
        this.reload();
      }
    });
    return this.dataSubject.asObservable();
  }

  connectReload(): void {
    if (this.reload$) {
      this.reload$.complete();
      this.reload$.unsubscribe();
      this.reload$ = new Subject();
    }
    this.reload$.pipe(switchMap(() => this.loadData(this.filteredQuery)))
      .subscribe(res => this.onDataLoaded(res), err => this.onLoadFailed(err));
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.dataSubject.unsubscribe();
    this.dataSubject = null;
    if (this.reload$) {
      this.reload$.complete();
      this.reload$.unsubscribe();
    }
    this.onStartSearch.complete();
    this.onStartSearch.unsubscribe();
    this.onStartSearch = null;

    this.onReload.complete();
    this.onReload.unsubscribe();
    this.onReload = null;

    this.onError.complete();
    this.onError.unsubscribe();
    this.onError = null;
  }

  public applyFilter(filter: any): void {
    this.filteredQuery.filter = filter;
    this._paginator.pageIndex = 0;
    this.reload();
  }

  reload(): void {
    if (this._paginator) {
      this.filteredQuery._start = this._paginator.pageIndex * this._paginator.pageSize;
      this.filteredQuery._limit = this._paginator.pageSize;
    }
    if (this._sort && this._sort.active && this._sort.direction) {
      this.filteredQuery._sort = this._sort.active;
      this.filteredQuery._order = this._sort.direction.toUpperCase();
    } else {
      this.filteredQuery._sort = undefined;
      this.filteredQuery._order = undefined;
    }

    this.onStartSearch.emit();
    this.reload$.next();
  }

  onDataLoaded(res: DataResponse<T>): void {
    if (!res) {
      return;
    }
    this.count = res.count;
    this.dataSubject.next(res.data);
    if (this._paginator) {
      this._paginator.length = res.count;
    }
    this.onReload.emit();
  }

  onLoadFailed(err: any): void {
    this.onError.emit(err);
    this.connectReload();
  }

  init(paginator: MatPaginator, sort: MatSort, filter?: {[key: string]: string}): void {
    if (paginator) {
      this._paginator = paginator;
      this._paginator.page.subscribe( (evt: PageEvent) => {
        this.reload();
      });
    }
    if (sort) {
      this._sort = sort;
      this._sort.sortChange.subscribe((evt: Sort) => {
        this.reload();
      });
    }
    if (filter) {
      this.filteredQuery.filter = filter;
    }
  }

  get data(): T[] {
    return this.dataSubject.getValue();
  }

  getPage(): number {
    return this._paginator ? this._paginator.pageIndex : 0;
  }

  getPageSize(): number {
    return this._paginator ? this._paginator.pageSize : 0;
  }

  getTotalCount(): number {
    return this._paginator ? this._paginator.length : 0;
  }

  getSort(): MatSort {
    return this._sort;
  }

  abstract loadData(fq: FilteredQuery): Observable<DataResponse<T>>;
}
