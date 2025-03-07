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

    number(num: any) {
      return this._decimalPipe.transform(num, '1.2-2');
    }

  duracion = input<any>();
  emisiones = input<any>();
  energia = input<any>();

  ngOnInit(): void {
      console.log(this.energia())
  }
 }
