import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbProgressbarConfig, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ejecucion',
  imports: [NgbProgressbarModule],
  templateUrl: './ejecucion.component.html',
  styleUrl: './ejecucion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EjecucionComponent {

  estadosPosibles: string[] = [
    "error",
    "ejecucion",
    "finalizado"
  ]

  estado: string = this.estadosPosibles[1];
  progreso: number = 50;
  mensajeError: string = "Error en la ejecución";
  mostrarTodo: boolean = false;

  dataset: string = "MOCK";
  nFeatures: string = "MOCK";
  precision: string = "MOCK";
  kFolds: string = "MOCK";
  reps: string = "MOCK";
  alpha: string = "MOCK";
  wait: string = "MOCK";
  implementation: string = "MOCK";
  codecarbon: boolean = true;


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
