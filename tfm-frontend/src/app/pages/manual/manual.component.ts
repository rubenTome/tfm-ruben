import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-manual',
  imports: [],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualComponent { 
  constructor(private httpService: HttpService) {
    this.httpService.isLoggedIn().subscribe((response) => {
      if (!response) {
        window.location.href = "/login"
      }
    })
  }
}
