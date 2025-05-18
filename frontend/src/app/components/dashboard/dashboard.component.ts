import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MobileNavComponent } from '../shared/mobile-nav/mobile-nav.component';
import { DesktopNavComponent } from '../shared/desktop-nav/desktop-nav.component';
import { RouterOutlet } from '@angular/router';
import { ErrorCardComponent } from '../shared/error-card/error-card.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { UiServicesService } from '../../shared/services/ui-services.service';
import { TeacherService } from '../../shared/services/teacher.service';

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
export class DashboardComponent implements OnInit {
  private uiServices = inject(UiServicesService);
  private teacherService = inject(TeacherService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.teacherService.startAutoRefresh();
    this.destroyRef.onDestroy(() => this.teacherService.stopAutoRefresh());
  }

  errorExists = this.uiServices.errorExists;
  errorCard = this.uiServices.errorCard;
  isLoading = this.uiServices.isLoading;
}
