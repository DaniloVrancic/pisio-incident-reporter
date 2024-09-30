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

  isAddIncidentModalVisible: boolean = false;
  selectedLatitude: number | null = null;
  selectedLongitude: number | null = null;

  constructor(private mapService: MapService){}

  ngOnInit(): void {
      
  }

  offerAddIncident(event: google.maps.MapMouseEvent){
    this.selectedLatitude = event.latLng?.toJSON().lat as number;
    this.selectedLongitude = event.latLng?.toJSON().lng as number;

    console.log("Latitude: " + this.selectedLatitude);
    console.log("Longitude: " + this.selectedLongitude);

    this.isAddIncidentModalVisible = true;
  }

}
