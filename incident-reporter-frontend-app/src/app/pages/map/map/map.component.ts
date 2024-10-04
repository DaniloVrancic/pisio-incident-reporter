
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { AddLocationDialogComponent } from './add-location-dialog/add-location-dialog.component';
import { MapService } from './map.service';
import { IncidentType } from 'src/app/models/incident-type';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { Incident, Status } from 'src/app/models/incident';


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
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  selectedLongitude: number = 20.45847839252972;
  selectedLatitude: number = 44.79807782849736;
  isLocationSelected: boolean = false;

  allIncidentSubtypes: IncidentSubtype[] = [];
  allIncidents: Incident[] = [];
  approvedIncidents: Incident[] = [];
  allIncidentTypes: IncidentType[] = [];



  options: google.maps.MapOptions = {
    mapId: "1",
    center: { lat: this.selectedLatitude, lng: this.selectedLongitude },
    zoom: 13,
  };

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(private mapService: MapService){}

  ngOnInit(): void {
    try{

      let incidentTypeIdSet = new Set<number>();
      let testObject : Object;

      this.mapService.getAllIncidentSubtypes()
                     .subscribe((result: IncidentSubtype[]) => {this.allIncidentSubtypes = result; 
                      this.allIncidentSubtypes.forEach(subtype => {
                        const incidentType = subtype.incidentType;
              
                        // Only add the incident type if its id is not already in the Set
                        if (!incidentTypeIdSet.has(incidentType.id)) {
                          incidentTypeIdSet.add(incidentType.id);
                          this.allIncidentTypes.push(incidentType); // Add the unique incident type
                        }
                      });
                      
                    });

        this.mapService.getAllIncidents().subscribe((result: Incident[]) => {
          this.allIncidents = result;

          this.allIncidents.forEach((incident: Incident) => {
            let pathToPhoto = "";
            if(incident.status == Status.APPROVED)
            {
              pathToPhoto = `assets/markers/${incident.incidentSubtype.subtype}-marker.png`;
            }
            else{
              pathToPhoto = `assets/markers/${incident.incidentSubtype.subtype}-marker-pending.png`;
            }
            let imgTag = document.createElement('img');
            imgTag.src = pathToPhoto;
            imgTag.onerror = () => {
              imgTag.src = `assets/markers/type_icons/other-marker.png`;
            };
            incident.content = imgTag;
          });
          
          this.approvedIncidents = this.allIncidents.filter((incident: Incident) => {return incident.status == Status.APPROVED});
          
          this.loadMarkers(this.allIncidents);
        })
                   
    }
    catch(error: any){
      console.error("Error happened during fetching incident subtypes.\n" + error);
    }
  }
  ngAfterViewInit(){
    
  }

  loadMarkers(incidents: Incident[]): void {
    incidents.forEach((incident: Incident) => {
      const { latitude, longitude, incidentSubtype, status } = incident;
      const markerImage = this.getMarkerImage(incidentSubtype.subtype, status);
  
      // Create a marker with the position and the selected image
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        
        icon: markerImage, // Assign the selected marker image
      });
  
      // Optional: You can add click event listeners or infowindows here
      marker.addListener('click', () => {
       // this.handleLoadedMarkerClick(incident);
      });
    });
  }

  getMarkerImage(subtype: string | null, status: Status): string {
    const basePath = 'assets/markers/';
    const markerType = status === Status.APPROVED ? '' : '-pending';
    const markerPath = `${basePath}${subtype?.toLowerCase()}-marker${markerType}.png`;
  
    // Check if the image exists in the assets folder
    const img = new Image();
    img.src = markerPath;
  
    // If image fails to load, use the fallback image
    img.onerror = () => {
      img.src = `${basePath}type_icons/other-marker.png`;
    };
  
    return img.src;
  }

  public handleMapClick(clickEvent: google.maps.MapMouseEvent){
    this.selectedLatitude = clickEvent.latLng?.toJSON().lat as number;
    this.selectedLongitude = clickEvent.latLng?.toJSON().lng as number;

    this.isLocationSelected = true;
  }

  public handleMarkerClick(clickEvent: google.maps.MapMouseEvent){
    
  }

  public handleLoadedMarkerClick(marker: MapAdvancedMarker, incident: Incident){
    
    this.infoWindow.open(marker, true);
  }

  public handleMarkerRightClick(event: google.maps.MapMouseEvent){
    
    this.isLocationSelected = false;
   
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddLocationDialogComponent, {
      width: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        incidentTypes: this.allIncidentTypes,
        incidentSubtypes: this.allIncidentSubtypes,
        latitude: this.selectedLatitude,
        longitude: this.selectedLongitude
      }
    });
  }

  offerAddIncident(event: google.maps.MapMouseEvent){
    this.selectedLatitude = event.latLng?.toJSON().lat as number;
    this.selectedLongitude = event.latLng?.toJSON().lng as number;

  }

}
