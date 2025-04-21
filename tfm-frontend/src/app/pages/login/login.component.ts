import { Component } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  constructor(private httpService: HttpService) {}

  paramsForm = new FormGroup({
      name: new FormControl<string>("", [Validators.required, Validators.email]),
      password: new FormControl<string>("", Validators.required)
  })

  mostrarError: boolean = false;

  sendForm() {
    this.httpService.loginUser({email: this.paramsForm.value.name, password:this.paramsForm.value.password}).subscribe((response) => {
      if (response.toString().startsWith("Error") || !this.paramsForm.valid) {
        this.mostrarError = true;
      }
      else {
        window.location.href = "/inicio"
      }
    });
  }

}
