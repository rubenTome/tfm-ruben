import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule, NgbAccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  datasetsOptions = [
    "",
    "Colon", 
    "Leukemia", 
    "Lung",
    "Lymphoma",
    "Gina",
    "Gisette",
    "Dexter",
    "Madelon",
  ]
  precisionOptions = [
    "",
    "16",
    "32",
    "64",
  ]
  implementationOptions = [
    "Lineal",
    "Convolucional"
  ]

  paramsForm = new FormGroup({
    dataset: new FormControl<string>(this.datasetsOptions[0]),
    nFeatures: new FormControl(),
    precision: new FormControl<string>(this.precisionOptions[0]),
    kFolds: new FormControl(2),
    reps: new FormControl(5),
    alpha: new FormControl(0.25),
    wait: new FormControl(25),
    implementation: new FormControl<string>(this.implementationOptions[1]),
    codecarbon: new FormControl(true),
  });

  sendForm() {
    console.log(this.paramsForm.value)
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
}
