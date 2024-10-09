import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
      <img src='assets/images/logos/location.png' style="max-width: 2.5rem; max-height: 2.5rem;">
      <h2 style="text-align: center;">Incident Reporter</h2>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {
  }
}
