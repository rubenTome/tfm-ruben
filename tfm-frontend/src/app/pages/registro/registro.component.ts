import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent {
  constructor(private httpService: HttpService) {}

  paramsForm = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", Validators.required),
    passwordRepeat: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),

  })

  mostrarErrorPasswd: boolean = false;
  mostrarErrorEmail: boolean = false;

  sendForm() {
    if (!this.paramsForm.valid) {
      this.mostrarErrorEmail = true;
      this.mostrarErrorPasswd = false;
    }
    else if (this.paramsForm.value.password !== this.paramsForm.value.passwordRepeat) {
      this.mostrarErrorPasswd = true;
      this.mostrarErrorEmail = false;
    }

    else {
      this.httpService.registerUser({ email: this.paramsForm.value.name, password: this.paramsForm.value.password }).subscribe((response) => {
        window.location.href = "/inicio"
      });
    }
  }

}
