import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbAccordionModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial',
  imports: [NgbAccordionModule, NgbPaginationModule, NgbScrollSpyModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialComponent {
  nPaginas = 1
  irDetalle() {
    window.location.href = "detalle";
  }
}
