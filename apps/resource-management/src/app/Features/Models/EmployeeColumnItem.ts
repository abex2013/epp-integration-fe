import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { IEmployeeViewModel } from '../Models/Employee/EmployeeViewModel';
import { listtToFilter } from './listToFilter';

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<IEmployeeViewModel> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<IEmployeeViewModel> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
  }
