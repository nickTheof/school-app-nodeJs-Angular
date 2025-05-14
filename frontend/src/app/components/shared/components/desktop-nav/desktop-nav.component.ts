import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop-nav',
  imports: [],
  templateUrl: './desktop-nav.component.html',
  styleUrl: './desktop-nav.component.css',
  host: {
    class: 'hidden lg:block w-1/5 min-h-[calc(100vh-200px)] bg-[#762124]',
  },
})
export class DesktopNavComponent {}
