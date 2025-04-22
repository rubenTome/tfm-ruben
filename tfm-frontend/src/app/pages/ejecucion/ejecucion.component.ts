import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ExecInfoServiceService } from '../../services/exec_info-service.service';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-ejecucion',
  imports: [NgbProgressbarModule],
  templateUrl: './ejecucion.component.html',
  styleUrl: './ejecucion.component.css',
})
export class EjecucionComponent implements OnInit, OnDestroy {
  
  exec_info: any;
  timer: any;
  mostrarTodo: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private ExecInfoServiceService: ExecInfoServiceService, private httpService: HttpService) { 
    this.httpService.isLoggedIn().subscribe((response) => {
      if (!response) {
        window.location.href = "/login"
      }
    });

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

  volver() {
    window.location.href = "/home"
  }

  verUltimoExp() {
    window.location.href = "/experimentos/" + this.exec_info.id;
  }

}
