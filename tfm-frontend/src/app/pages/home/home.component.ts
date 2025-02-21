import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule, NgbAccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [NgbModalConfig, NgbModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent{
  constructor(private httpService: HttpService, config: NgbModalConfig, private modalService: NgbModal) {
    this.httpService.getDatasets().subscribe((response) => {
      this.datasetsOptions = response.toString().split(",");
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  datasetInfo: any;

  datasetsOptions: string[] = [" ", "Cargando..."];

  precisionOptions = [
    "",
    "16-bits en punto flotante",
    "32-bits en punto flotante",
    "64-bits en punto flotante",
  ]

  implementationOptions = [
    "Lineal",
    "Lineal v2 (capa convolucional)"
  ]

  paramsForm = new FormGroup({
    dataset: new FormControl<string>(this.datasetsOptions[0]),
    nFeatures: new FormControl(),
    precision: new FormControl<string>(this.precisionOptions[0]),
    kFolds: new FormControl(2),
    reps: new FormControl(5),
    alpha: new FormControl(0.25),
    wait: new FormControl(25),
    implementation: new FormControl<string>(this.implementationOptions[0]),
    codecarbon: new FormControl(true),
  });

  sendForm() {
    this.httpService.sendForm(this.paramsForm.value)
    window.location.href = "/home/ejecucion-actual"
  }

  resetForm() {
    this.paramsForm.reset({
      dataset: this.datasetsOptions[0],
      precision: this.precisionOptions[0],
      kFolds: 2,
      reps: 5,
      alpha: 0.25,
      wait: 25,
      implementation: this.implementationOptions[0],
      codecarbon: true
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.datasetInfo = formData;
    }
  }

  saveFile() {
    this.httpService.saveFile(this.datasetInfo).subscribe(() => {
      this.httpService.getDatasets().subscribe((response) => {
        this.datasetsOptions = response.toString().split(",");
        this.modalService.dismissAll();
      });
    });
  }
}
