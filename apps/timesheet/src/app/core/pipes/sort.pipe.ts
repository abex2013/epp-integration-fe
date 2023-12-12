import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, args: any[]): any {
    const sortField = args[0];
    const sortdirection = args[1];

    let multiplier = 1;

    if(sortdirection === 'desc') {
      multiplier = -1;
    }

    if (value) {
      value.sort((a: any, b: any) => {
        if (a[sortField] < b[sortField]) {
          return -1 * multiplier;
        } else if (a[sortField] > b[sortField]) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      }
      );

      return value;
    }

}
}
