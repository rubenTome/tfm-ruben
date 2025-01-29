import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetExperimentoService {
  constructor(private http: HttpClient) {}

  sendForm(params: any) {
    this.http.get(`http://127.0.0.1:8000/experiment/?dataset=${params.dataset?.toLowerCase()}&nFeat=${params.nFeatures}&prec=${params.precision?.slice(0,2)}&kFolds=${params.kFolds}&reps=${params.reps}&alpha=${params.alpha}&wait=${params.wait}&implementation=${params.implementation?.toLowerCase()}&codecarbon=${params.codecarbon ? "usar_codecarbon" : ""}`
    ).subscribe(result => {
        console.log(result)
        return result;
    });
  }

  getDetalle(detalle: any): any {
    this.http.get(`http://127.0.0.1:8000/detalle?id=${detalle}`
    ).subscribe(result => {
        console.log(result)
        return result;
    });
  }

}
