import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../services/http-service.service';
import { MeanPipe } from '../../pipes/mean.pipe';
import { DecimalPipe } from '@angular/common';
import { PercPipe } from '../../pipes/percentage.pipe';

@Component({
  selector: 'app-historial',
  imports: [NgbAccordionModule, NgbPaginationModule, NgbScrollSpyModule, MeanPipe, PercPipe],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DecimalPipe],
})
export class HistorialComponent implements OnInit{
  nPaginas = 1
  history: any;

  constructor(private httpService: HttpService, private _decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.httpService.getHistory().subscribe((response: any) => {
      this.history = response;
    });
  }

  number(num: any, format: string = '1.2-2') {
    return this._decimalPipe.transform(num, format);
  }

  getFecha(id: string) {
    let date = new Date(Number(id) * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  irDetalle(id: string) {
    window.location.href = "/experimentos/" + id;
  }
}
