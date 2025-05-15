import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-desktop-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './desktop-nav.component.html',
  styleUrl: './desktop-nav.component.css',
  host: {
    class: 'hidden lg:block w-1/5 min-h-[calc(100vh-200px)] bg-[#762124]',
  },
})
export class DesktopNavComponent {}
