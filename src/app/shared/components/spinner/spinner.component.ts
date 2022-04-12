import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.sevice';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSvc.isLoding$;
  constructor(private spinnerSvc: SpinnerService) { }
}
