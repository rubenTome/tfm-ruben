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
  detalle = input<any>();
  n_feat = input<number>();

  ngOnInit(): void {
    this.maxFeat = this.n_feat()
  } 
}