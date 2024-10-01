import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NumberValueAccessor } from '@angular/forms';

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
export class AppMapComponent implements AfterViewInit {

  @ViewChild('selectionMapMarker') selectionMapMarker!: ElementRef;

  selectedLongitude: number = 20.45847839252972;
  selectedLatitude: number = 44.79807782849736;
  isLocationSelected: boolean = false;

  options: google.maps.MapOptions = {
    mapId: "1",
    center: { lat: this.selectedLatitude, lng: this.selectedLongitude },
    zoom: 13,
  };

  constructor(){}

  ngAfterViewInit(){
    
  }

  public handleMapClick(clickEvent: google.maps.MapMouseEvent){
    this.selectedLatitude = clickEvent.latLng?.toJSON().lat as number;
    this.selectedLongitude = clickEvent.latLng?.toJSON().lng as number;

    this.isLocationSelected = true;
  }

  public handleMarkerClick(clickEvent: google.maps.MapMouseEvent){
    console.log("Marker clicked");
  }

  public handleMarkerRightClick(event: google.maps.MapMouseEvent){
    
    this.isLocationSelected = false;
   
  }


}
