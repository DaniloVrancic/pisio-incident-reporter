import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatCardModule,
            MatIconModule,
            MatButtonModule,
            MatDialogModule,
            GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  
})
export class AppMapComponent {
  options: google.maps.MapOptions = {
    mapId: "1",
    center: { lat: 44.79807782849736, lng: 20.469100626055457 },
    zoom: 13,
  };



}
