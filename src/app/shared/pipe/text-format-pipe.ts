import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat',
})
export class TextFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      return value.replace(/_/g, ' ').toLowerCase() // Replace underscores with spaces
                  .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    }
    return value;
  }
}
