import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial',
  imports: [NgbAccordionModule, NgbPaginationModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialComponent {
  nPaginas = 1
}
