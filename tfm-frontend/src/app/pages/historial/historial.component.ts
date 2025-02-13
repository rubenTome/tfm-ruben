import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GetExperimentoService } from '../../services/get-experimento.service';

@Component({
  selector: 'app-historial',
  imports: [NgbAccordionModule, NgbPaginationModule, NgbScrollSpyModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HistorialComponent implements OnInit{
  nPaginas = 1
  history: any;

  constructor(private getExperimentoService: GetExperimentoService) { }

  ngOnInit() {
    this.getExperimentoService.getHistory().subscribe((response: any) => {
      this.history = response;
    });
  }

  getFecha(id: string) {
    let date = new Date(Number(id) * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  irDetalle(id: string) {
    window.location.href = "/experimentos/" + id;
  }
}
