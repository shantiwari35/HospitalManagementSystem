import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleNull',
})
export class HandleNullPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return value;
  }
}
