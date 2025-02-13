import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetExperimentoService } from '../../services/get-experimento.service';
import { BarPlotComponent } from "./bar-plot/bar-plot.component";
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle',
  imports: [BarPlotComponent, NgbScrollSpyModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleComponent implements OnInit { 
  id?: string|null;
  detalle: any;

  constructor(private route: ActivatedRoute, private getExperimentoService:GetExperimentoService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getExperimentoService.getDetalle(this.id).subscribe((response: any) => {
      this.detalle = response;
    });
  }
}
