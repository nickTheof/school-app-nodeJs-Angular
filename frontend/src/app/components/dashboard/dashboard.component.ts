import { Component, inject } from '@angular/core';
import { MobileNavComponent } from '../shared/mobile-nav/mobile-nav.component';
import { DesktopNavComponent } from '../shared/desktop-nav/desktop-nav.component';
import { RouterOutlet } from '@angular/router';
import { ErrorCardComponent } from '../shared/error-card/error-card.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { UiServicesService } from '../../shared/services/ui-services.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MobileNavComponent,
    DesktopNavComponent,
    RouterOutlet,
    ErrorCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private uiServices = inject(UiServicesService);

  errorExists = this.uiServices.errorExists;
  errorCard = this.uiServices.errorCard;
  isLoading = this.uiServices.isLoading;
}
