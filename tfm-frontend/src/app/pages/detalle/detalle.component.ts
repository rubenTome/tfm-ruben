import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetExperimentoService } from '../../services/get-experimento.service';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleComponent implements OnInit { 
  id?: string|null;

  constructor(private route: ActivatedRoute, private getExperimentoService:GetExperimentoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getExperimentoService.getDetalle(this.id);
  }
}
