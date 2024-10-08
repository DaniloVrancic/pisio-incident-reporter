
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
import { FilterLocationsDialogComponent } from './filter-locations-dialog/filter-locations-dialog.component';
import { MapStateService } from './map-state.service';


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

export class AppMapComponent implements OnInit, AfterViewInit, OnDestroy {

  isInitialized: boolean = false;

  selectedLongitude: number = 20.45847839252972;
  selectedLatitude: number = 44.79807782849736;
  isLocationSelected: boolean = false;

  allIncidentSubtypes: IncidentSubtype[] = [];
  allIncidents: Incident[] = [];
  approvedIncidents: Incident[] = [];
  allIncidentTypes: IncidentType[] = [];

  selectedMarker : any = null;

  mapClickListener: any = null;
  mapRightClickListener: any = null;
  mapMarkerClickListener: any = null;

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(private mapService: MapService, 
              public mapStateService: MapStateService, 
              private cdr: ChangeDetectorRef){
  }



  private readSubtypesAndTypes(incidentTypeIdSet: Set<number>) {
    this.mapService.getAllIncidentSubtypes()
      .subscribe((result: IncidentSubtype[]) => {
        this.allIncidentSubtypes = result;
        this.allIncidentSubtypes.forEach(subtype => {
          const incidentType = subtype.incidentType;

          // Only add the incident type if its id is not already in the Set
          if (!incidentTypeIdSet.has(incidentType.id)) {
            incidentTypeIdSet.add(incidentType.id);
            this.allIncidentTypes.push(incidentType);
          }
        });

      });
  }
  private readIncidentsAndLoadMarkers() {
    this.mapService.getAllIncidents().subscribe((result: Incident[]) => {
      this.allIncidents = result;

      this.allIncidents.forEach((incident: Incident) => {
        let pathToPhoto = "";
        if (incident.status == Status.APPROVED) {
          pathToPhoto = `assets/markers/${incident.incidentSubtype.subtype}-marker.png`;
        }
        else {
          pathToPhoto = `assets/markers/${incident.incidentSubtype.subtype}-marker-pending.png`;
        }
        let imgTag = document.createElement('img');
        imgTag.src = pathToPhoto;
        imgTag.onerror = () => {
          imgTag.src = `assets/markers/type_icons/other-marker.png`;
        };
        incident.content = imgTag;
      });

      this.approvedIncidents = this.allIncidents.filter((incident: Incident) => { return incident.status == Status.APPROVED; });

      this.loadMarkers(this.allIncidents);
    });
  }
  ngOnInit(): void {
    try{

      let incidentTypeIdSet = new Set<number>();

      this.readSubtypesAndTypes(incidentTypeIdSet);

      this.readIncidentsAndLoadMarkers();
                   
    }
    catch(error: any){
      console.error("Error happened during fetching incident subtypes.\n" + error);
    }

  }

  ngOnDestroy(): void {
      
  }
  



  ngAfterViewInit(){
    this.initMap();
    window['approveIncident'] = this.approveIncident.bind(this);
    window['rejectIncident'] = this.rejectIncident.bind(this);
    
    this.cdr.detectChanges();

    
  }

  private initMap = async () => {
    
      // Request needed libraries.
      const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      
      this.mapStateService.initializeMap(this.selectedLatitude, this.selectedLongitude, document.getElementById('map'));
      if(this.mapStateService.isInitialized == false){
        this.mapStateService.map.addListener('click', (event: any)=>{this.handleMapClick(event, this.mapStateService.map)});
        google.maps.event.addListener(this.mapStateService.map, 'rightclick', (event: any) => {this.handleMarkerRightClick(event);});
        this.mapStateService.isInitialized = true;
       }
       else{
        document.getElementById('map')?.appendChild(this.mapStateService.domWithMap as HTMLElement);
       }
    const map = this.mapStateService.map;

      this.allIncidents.forEach(incident => {
        const marker = new AdvancedMarkerElement({
          map,
          position: {lat: incident.latitude, lng: incident.longitude},
          content: incident.content,
          gmpClickable: true,
          title: incident.timeOfIncident,
          zIndex: 999
        });

        const infoWindow = new InfoWindow();
        marker.addListener('click', ({ domEvent, latLng }: any) => {

          const { target } = domEvent;
          if(infoWindow.isOpen){
            infoWindow.close();
            return;
          }
          let contentString = `
          <style>
          .btn {
                cursor: pointer;
                border: 1px solid rgb(0, 0, 0);
                font-family: "system-ui";
                font-size: 18px;
                color: rgb(0, 136, 255);
                padding: 15px 30px;
                margin: 0.3rem;
                transition: 146ms;
                width: 200px;
                box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
                border-radius: 20px;
                background: rgb(255, 255, 255);
                font-weight: 400;
                --hover-borderSize: 3px;
                --hover-width: 200px;
                --hover-borderc: #0088ff;
                }

          .btn:hover{
                color: rgb(255, 255, 255);
                width: 200px;
                background: rgb(0, 102, 204) none repeat scroll 0% 0% / auto padding-box border-box;
                border-color: rgb(0, 136, 255);
                border-style: solid;
                }
          </style>
          <div class='contentContainer'>
            <div style='align-content: center; justify-content: center;'>
              <img src=${incident.photoUrl} style='max-width: 12rem; max-height: 12rem;' onerror="this.src='assets/images/fallback/notFound.png';"/>
            </div>
            <div class='descriptionContainer'>
              <h3 style='text-align: center; font-size: 1.2rem'>Description</h3>
              <div style='font-size: 0.85rem'>${incident.description}</div>
            </div>
            <div class='timeContainer'>
              <h3 style='text-align: center; font-size: 1.2rem'>Time of Incident</h3>
              <div style='font-size: 0.85rem'>${incident.timeOfIncident}</div>
            </div>
            <div class='button-container' style="padding: 1rem 0rem; display: flex; flex-direction: column; justify-content: space-around;">
            `+
            ((incident.status === Status.REQUESTED) ? `<button class='btn' onclick="approveIncident(${incident.id})">Approve</button>` : ``)
             +
              `<button class='btn' onclick="rejectIncident(${incident.id})">Remove</button>
            </div>
          </div>`;

          infoWindow.setContent(contentString);
          infoWindow.open(marker.map, marker);
      });
  });
}

approveIncident(incidentId: number) {
  // Your logic to approve the incident
  console.log(`Approving incident with ID: ${incidentId}`);
}

rejectIncident(incidentId: number) {
  // Your logic to reject/remove the incident
  console.log(`Removing incident with ID: ${incidentId}`);
}

toggleHighlight(markerView: any, incident: any) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}
  

  private async loadMarkers(incidents: Incident[]) { //DELETE THIS LATER

    const { AdvancedMarkerElement } : any = await google.maps.importLibrary("marker");

    incidents.forEach((incident: Incident) => {
      const { latitude, longitude, incidentSubtype, status } = incident;
      const markerImage = this.getMarkerImage(incidentSubtype.subtype, status);
  
      // Create a marker with the position and the selected image
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        //icon: markerImage, // Assign the selected marker image
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

  public async handleMapClick(clickEvent: google.maps.MapMouseEvent, map: any){

    const { AdvancedMarkerElement } : any = await google.maps.importLibrary("marker");
    
    let tempMarker : google.maps.marker.AdvancedMarkerElement = this.selectedMarker;

    if(this.selectedMarker != null || this.selectedMarker != undefined){
      this.selectedMarker.map = null
      this.isLocationSelected = false;
    }

    this.selectedLatitude = clickEvent.latLng?.toJSON().lat as number;
    this.selectedLongitude = clickEvent.latLng?.toJSON().lng as number;
    this.isLocationSelected = true;
    
    if(this.isLocationSelected){
      this.selectedMarker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: this.selectedLatitude, lng: this.selectedLongitude },
        gmpDraggable: true,
        map
        //icon: markerImage, // Assign the selected marker image
      });
      this.selectedMarker.addListener("click", (event:any) => {this.handleMarkerClick(event)});
      this.selectedMarker.addListener("dragend", (event:any) => {this.handleMarkerDragEnd(event, map)});
      
      this.cdr.detectChanges(); //DETECTS WHEN CHANGES ARE MADE
    }
    
    
  }

  public handleMarkerClick(clickEvent: google.maps.MapMouseEvent){
    this.selectedMarker.map = null;
    this.isLocationSelected = false;
    this.cdr.detectChanges(); //DETECT CHANGES ON THE UI
  }

  public handleMarkerDragEnd(dragEvent: any, map: any){

    this.selectedLatitude = dragEvent.latLng?.toJSON().lat as number;
    this.selectedLongitude = dragEvent.latLng?.toJSON().lng as number;
    this.isLocationSelected = true;
    this.cdr.detectChanges(); //DETECT CHANGES ON THE UI
  }

  public handleMarkerRightClick(event: google.maps.MapMouseEvent){
    
    this.isLocationSelected = false;
    if(this.selectedMarker){
      this.selectedMarker.map = null; 
    }
    
    this.cdr.detectChanges(); //Detect changes on the UI
  }

  openAddLocationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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

  openFilterLocationsDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterLocationsDialogComponent, {
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
