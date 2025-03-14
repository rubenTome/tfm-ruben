import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExecInfoServiceService {

  constructor(private http: HttpClient) { }

  getExecInfo() {
    return this.http.get(`http://127.0.0.1:8000/exec_info`)
  }
}
