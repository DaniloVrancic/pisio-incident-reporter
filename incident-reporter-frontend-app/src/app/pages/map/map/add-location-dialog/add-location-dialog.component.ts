import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-location-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './add-location-dialog.component.html',
  styleUrl: './add-location-dialog.component.scss'
})
export class AddLocationDialogComponent {

}
