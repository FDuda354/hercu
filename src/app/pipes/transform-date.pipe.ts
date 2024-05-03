import { Pipe, PipeTransform } from '@angular/core';
import { format, isValid, parseISO } from 'date-fns';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(value: Date | string | undefined): string {
    if (!value) return '';
    let date = value instanceof Date && isValid(value) ? value : null;
    if (!date && typeof value === 'string') {
      date = parseISO(value);
    }
    return date && isValid(date) ? format(date, 'dd.MM.yyyy') : '';
  }

}
