import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatCardModule,
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
