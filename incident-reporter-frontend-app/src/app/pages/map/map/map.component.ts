import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MapService } from './map.service';

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
  providers: [MapService]
  
})
export class AppMapComponent implements OnInit{
  options: google.maps.MapOptions = {
    mapId: "1",
    center: { lat: 44.79807782849736, lng: 20.469100626055457 },
    zoom: 13,
  };

  constructor(private mapService: MapService){}

  ngOnInit(): void {
      
  }

  offerAddIncident(event: google.maps.MapMouseEvent){
    let selectedLatitude = event.latLng?.toJSON().lat;
    let selectedLongitude = event.latLng?.toJSON().lng;

    console.log("Latitude: " + selectedLatitude);
    console.log("Longitude: " + selectedLongitude);
  }

}
