import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class HeaderComponent {
  dropDownHeaderLogoutMenu = false;

  dropdownToggler = viewChild<ElementRef<HTMLButtonElement>>('dropdownToggler');
  dropdownMenu = viewChild<ElementRef<HTMLDivElement>>('dropdownMenu');

  clickDropdownHeaderLogoutMenu() {
    this.dropDownHeaderLogoutMenu = !this.dropDownHeaderLogoutMenu;
  }

  onDocumentClick(event: MouseEvent): void {
    const menuEl = this.dropdownMenu()?.nativeElement;
    const togglerEl = this.dropdownToggler()?.nativeElement;

    if (
      !menuEl?.contains(event.target as Node) &&
      !togglerEl?.contains(event.target as Node)
    ) {
      this.dropDownHeaderLogoutMenu = false;
    }
  }
}
