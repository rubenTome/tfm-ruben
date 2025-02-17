import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bar-plot',
  imports: [CommonModule, FormsModule],
  templateUrl: './bar-plot.component.html',
  styleUrl: './bar-plot.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarPlotComponent { 
  detalle = input<any>();
  maxFeat = 10
}
