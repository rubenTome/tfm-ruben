import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bar-plot',
  imports: [CommonModule, FormsModule],
  templateUrl: './bar-plot.component.html',
  styleUrl: './bar-plot.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarPlotComponent implements OnInit{
  maxFeat: any;
  irrelevant: any = 0;
  detalle = input<any>();
  n_feat = input<number>();

  ngOnInit(): void {
    this.maxFeat = this.n_feat()
    this.detalle().forEach((element: any[]) => {
      if (element[1] < 0.00103) {
        this.irrelevant += 1;
      }
    });
    this.irrelevant -= this.maxFeat;
  } 
  
}