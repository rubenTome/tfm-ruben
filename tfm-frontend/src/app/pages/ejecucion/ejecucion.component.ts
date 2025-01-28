import { AfterContentChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { GetExperimentoService } from '../../services/get-experimento.service';
import * as exec_info from "../../../../../tfm-db/exec_info.json"


@Component({
  selector: 'app-ejecucion',
  imports: [NgbProgressbarModule],
  templateUrl: './ejecucion.component.html',
  styleUrl: './ejecucion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EjecucionComponent {

  constructor(private getExperimentoService: GetExperimentoService) { }

  estadosPosibles: string[] = [
    "error",
    "ejecucion",
    "finalizado",
    "inicial"
  ]

  progreso: number = exec_info.progress;
  status: string = exec_info.status;
  mostrarTodo: boolean = false;

  //como acceder a la variable del servicio ???????
  dataset: string = exec_info.ds.toString();
  nFeatures: string = exec_info.n_features_to_select.toString();
  precision: string = exec_info.precision.toString().slice(0, 2) + "-bits coma flotante";
  kFolds: string = exec_info.k_folds.toString();
  reps: string = exec_info.N.toString();
  alpha: string = exec_info.fi.toString();
  wait: string = exec_info.wait.toString();
  implementation: string = exec_info.net;
  codecarbon: boolean = exec_info.codecarbon_tracking;


  toggleMostrarTodo() {
    this.mostrarTodo = !this.mostrarTodo;
  }

  reintentar() {
    console.log("Reintentar");
  }

  verUltimoExp() {
    console.log("Ver último experimento");
  }

}
