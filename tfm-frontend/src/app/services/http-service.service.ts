import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  
  registerUser(userData: any) {
    return this.http.post(`http://127.0.0.1:8000/registrarse`, userData);
  }

  loginUser(userData: any) {
    return this.http.put(`http://127.0.0.1:8000/login`, userData)
  }

  isLoggedIn() {
    return this.http.get("http://127.0.0.1:8000/isLoggedIn")
  }

  sendForm(params: any) {
    this.http.get(`http://127.0.0.1:8000/experiment/?dataset=${params.dataset?.toLowerCase()}&nFeat=${params.nFeatures}&prec=${params.precision?.slice(0,2)}&kFolds=${params.kFolds}&reps=${params.reps}&alpha=${params.alpha}&wait=${params.wait}&implementation=${params.implementation?.toLowerCase()}&codecarbon=${params.codecarbon ? "usar_codecarbon" : ""}`
    ).subscribe(result => {
        return result;
    });
  }

  getDetalle(detalle: any): any {
    return this.http.get(`http://127.0.0.1:8000/detalle?id=${detalle}`);
  }

  getHistory() {
    return this.http.get(`http://127.0.0.1:8000/historial`);
  }

  getDatasets() {
    return this.http.get(`http://127.0.0.1:8000/datasets_list`);
  }

  saveFile(file: FormData) {
    return this.http.put(`http://127.0.0.1:8000/dataset`, file);
  }

  deleteFile(filename: any) {
    return this.http.delete(`http://127.0.0.1:8000/delete_dataset?filename=${filename}`);
  }

  getEmail() {
    return this.http.get(`http://127.0.0.1:8000/getEmail`);
  }

  logout() {
    return this.http.get(`http://127.0.0.1:8000/logout`);
  }
}
