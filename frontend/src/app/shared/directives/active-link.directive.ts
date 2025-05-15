import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appActiveLink]',
  host: {
    '[routerLinkActive]': 'activeClassValue',
    '[routerLinkActiveOptions]': '{ exact: true }',
  },
})
export class ActiveLinkDirective {}
