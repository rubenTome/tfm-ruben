import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http-service.service';
import { BarPlotComponent } from "./bar-plot/bar-plot.component";
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { EmissionsPlotComponent } from "./emissions-plot/emissions-plot.component";
import { DecimalPipe } from '@angular/common';
import { MeanPipe } from '../../pipes/mean.pipe';
import { SumPipe } from '../../pipes/sum.pipe';

@Component({
  selector: 'app-detalle',
  imports: [BarPlotComponent, NgbScrollSpyModule, EmissionsPlotComponent, MeanPipe, SumPipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class DetalleComponent implements OnInit { 
  id?: string|null;
  detalle: any;

  constructor(private route: ActivatedRoute, private httpService:HttpService, private _decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.getDetalle(this.id).subscribe((response: any) => {
      this.detalle = response;
    });
  }

  number(num: any, format: string = '1.2-2') {
    return this._decimalPipe.transform(num, format);
  }
}
