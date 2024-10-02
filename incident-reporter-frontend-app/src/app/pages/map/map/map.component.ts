
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';
import { AddLocationDialogComponent } from './add-location-dialog/add-location-dialog.component';
import { MapService } from './map.service';
import { IncidentType } from 'src/app/models/incident-type';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { Incident } from 'src/app/models/incident';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatCardModule,
            MatIconModule,
            MatButtonModule,
            MatDialogModule,
            MatTreeModule,
            GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  providers: [MapService]
  
})

export class AppMapComponent implements OnInit, AfterViewInit {

  @ViewChild('selectionMapMarker') selectionMapMarker!: ElementRef;

  selectedLongitude: number = 20.45847839252972;
  selectedLatitude: number = 44.79807782849736;
  isLocationSelected: boolean = false;

  allIncidentSubtypes: IncidentSubtype[] = [];
  allIncidents: Incident[] = [];
  allIncidentTypes: IncidentType[] = [];



  options: google.maps.MapOptions = {
    mapId: "1",
    center: { lat: this.selectedLatitude, lng: this.selectedLongitude },
    zoom: 13,
  };

  readonly dialog = inject(MatDialog);

  constructor(private mapService: MapService){}

  ngOnInit(): void {
    try{

      let incidentTypeIdSet = new Set<number>();
      let testObject : Object;

      this.mapService.getAllIncidentSubtypes()
                     .subscribe((result: IncidentSubtype[]) => {this.allIncidentSubtypes = result; 
                      console.log(this.allIncidentSubtypes);
                      this.allIncidentSubtypes.forEach(subtype => {
                        const incidentType = subtype.incidentType;
              
                        // Only add the incident type if its id is not already in the Set
                        if (!incidentTypeIdSet.has(incidentType.id)) {
                          incidentTypeIdSet.add(incidentType.id);
                          this.allIncidentTypes.push(incidentType); // Add the unique incident type
                        }
                      });
                      console.log(this.allIncidentTypes);
                    });
                   
    }
    catch(error: any){
      console.error("Error happened during fetching incident subtypes.\n" + error);
    }
  }
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddLocationDialogComponent, {
      width: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  offerAddIncident(event: google.maps.MapMouseEvent){
    this.selectedLatitude = event.latLng?.toJSON().lat as number;
    this.selectedLongitude = event.latLng?.toJSON().lng as number;

    console.log("Latitude: " + this.selectedLatitude);
    console.log("Longitude: " + this.selectedLongitude);

  }

}
