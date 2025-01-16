import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manual',
  imports: [],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualComponent { }
