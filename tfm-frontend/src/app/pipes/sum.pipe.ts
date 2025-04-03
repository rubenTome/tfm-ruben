import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true
})

export class SumPipe implements PipeTransform {
  transform(numeros: number[]): number {
    if (!numeros || numeros.length <= 1) return 0;
    const valoresSinPrimerElemento = numeros.slice(1);
    return valoresSinPrimerElemento.reduce((acc, num) => acc + num, 0);
  }
}
