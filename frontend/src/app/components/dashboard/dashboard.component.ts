import { Component } from '@angular/core';
import { MobileNavComponent } from '../shared/mobile-nav/mobile-nav.component';
import { DesktopNavComponent } from '../shared/desktop-nav/desktop-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MobileNavComponent, DesktopNavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
