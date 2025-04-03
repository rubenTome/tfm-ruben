import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import {DecimalPipe} from "@angular/common"

@Component({
  selector: 'app-emissions-plot',
  imports: [],
  templateUrl: './emissions-plot.component.html',
  styleUrl: './emissions-plot.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class EmissionsPlotComponent implements OnInit {
  constructor(private _decimalPipe: DecimalPipe) {}

    number(num: any, format: string = '1.2-2') {
      return this._decimalPipe.transform(num, format);
    }

  ngOnInit(): void {
    this.sumaDuracion = this.duracion().reduce((a: any, b: any) => a + b, 0);
    this.sumaEmisiones = this.emisiones().reduce((a: any, b: any) => a + b, 0);
    this.sumaEnergia = this.energia().reduce((a: any, b: any) => a + b, 0);
    console.log(this.sumaDuracion, this.sumaEmisiones, this.sumaEnergia);
  }

  duracion = input<any>();
  emisiones = input<any>();
  energia = input<any>();
  
  sumaDuracion: number = 0;
  sumaEmisiones: number = 0;
  sumaEnergia: number = 0;
 }
