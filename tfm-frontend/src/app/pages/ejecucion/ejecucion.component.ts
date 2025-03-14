import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ExecInfoServiceService } from '../../services/exec_info-service.service';


@Component({
  selector: 'app-ejecucion',
  imports: [NgbProgressbarModule],
  templateUrl: './ejecucion.component.html',
  styleUrl: './ejecucion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EjecucionComponent implements OnInit, OnDestroy {
  
  exec_info: any;
  timer: any;
  mostrarTodo: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private ExecInfoServiceService: ExecInfoServiceService) { 
    this.ExecInfoServiceService.getExecInfo().subscribe((response: any) => {
      this.exec_info = response
    });
  }

  ngOnInit() {
    this.iniciarTimer();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  iniciarTimer() {
    this.timer = setInterval(() => {
      this.ExecInfoServiceService.getExecInfo().subscribe((response: any) => {
        this.exec_info = response
        this.cdr.detectChanges();
      });
    }, 10000);
  }

  estadosPosibles: string[] = [
    "error",
    "ejecucion",
    "finalizado",
    "inicial"
  ]

  toggleMostrarTodo() {
    this.mostrarTodo = !this.mostrarTodo;
  }

  reintentar() {
    console.log("Reintentar");
  }

  verUltimoExp() {
    window.location.href = "/experimentos/" + this.exec_info.id;
  }

}
