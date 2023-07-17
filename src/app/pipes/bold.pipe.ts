import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold',
  standalone: true,
})
export class BoldPipe implements PipeTransform {

  transform(value: string, valueToBold: string): string {
    return value.replaceAll(new RegExp(`(${valueToBold})`, 'gi'), '<b>$1</b>');
  }

}
