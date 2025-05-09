import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent { 
  constructor(private httpService: HttpService) {
    this.isLoggedIn();
    this.httpService.getEmail().subscribe((response) => {
      console.log(response);
      this.email = response.toString();
    });
  }

  email = ""
  state = window.location.href.split('/').pop();
  isLoggedVar: any;

  isLoggedIn() {
    this.httpService.isLoggedIn().subscribe((response) => {
      this.isLoggedVar = response
    });
  }

  logout() {
    this.httpService.logout().subscribe((response) => {
      console.log(response);
      window.location.href = "/login"
    });
  }
  
}