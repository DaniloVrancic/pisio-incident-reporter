import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class AppDescriptionComponent {

}
