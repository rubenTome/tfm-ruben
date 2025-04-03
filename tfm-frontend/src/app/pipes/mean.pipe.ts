import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mean',
  standalone: true
})

export class MeanPipe implements PipeTransform {
  transform(numeros: number[]): number {
    if (!numeros || numeros.length <= 1) return 0;
    const valoresSinPrimerElemento = numeros.slice(1);
    const suma = valoresSinPrimerElemento.reduce((acc, num) => acc + num, 0);
    return suma / valoresSinPrimerElemento.length;
  }
}
