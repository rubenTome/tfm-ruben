import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true
})

export class PercPipe implements PipeTransform {
  transform(numero: number): number {
    return numero * 100;
  }
}
