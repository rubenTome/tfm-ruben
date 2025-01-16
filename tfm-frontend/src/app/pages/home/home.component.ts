import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  paramsForm = new FormGroup({
    dataset: new FormControl(''),
    nFeatures: new FormControl(''),
    precision: new FormControl(''),
    codecarbon: new FormControl(''),
    kFolds: new FormControl(''),
    reps: new FormControl(''),
    alpha: new FormControl(''),
    implementation: new FormControl(''),

  });

  datasetsOptions = [
    "Colon", 
    "Leukemia", 
    "Lung",
    "Lymphoma",
    "Gina",
    "Gisette",
    "Dexter",
    "Madelon",
  ]
  nFeaturesOptions = [
    "10",
    "20",
    "30",
    "40",
  ]
  precisionOptions = [
    "16",
    "32",
    "64",
  ]
}
