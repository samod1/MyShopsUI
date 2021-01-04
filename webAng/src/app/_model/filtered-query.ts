export interface FilteredQuery {
  _start?: number;
  _limit?: number;
  _order?: string; // 'ASC' : 'DSC'
  _sort?: string;
  filter?: {[key: string]: any};
}
