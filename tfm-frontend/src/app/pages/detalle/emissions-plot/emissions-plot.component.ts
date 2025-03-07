import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {DecimalPipe} from "@angular/common"

@Component({
  selector: 'app-emissions-plot',
  imports: [],
  templateUrl: './emissions-plot.component.html',
  styleUrl: './emissions-plot.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class EmissionsPlotComponent {
  constructor(private _decimalPipe: DecimalPipe) {}

    number(num: any, format: string = '1.2-2') {
      return this._decimalPipe.transform(num, format);
    }

  duracion = input<any>();
  emisiones = input<any>();
  energia = input<any>();
 }
