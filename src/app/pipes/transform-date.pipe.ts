import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(value: Date | undefined): string {
    if (!value) return '';

    const formatter = new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return formatter.format(value);
  }


}
