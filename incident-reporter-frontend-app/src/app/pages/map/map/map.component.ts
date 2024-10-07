
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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



  selectedLongitude: number = 20.45847839252972;
  selectedLatitude: number = 44.79807782849736;
  isLocationSelected: boolean = false;

  allIncidentSubtypes: IncidentSubtype[] = [];
  allIncidents: Incident[] = [];
  approvedIncidents: Incident[] = [];
  allIncidentTypes: IncidentType[] = [];

  selectedMarker : any = null;



  options: google.maps.MapOptions = {
    mapId: "4504f8b37365c3d0",
    center: { lat: this.selectedLatitude, lng: this.selectedLongitude },
    zoom: 13,
  };

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef){}



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
  



  ngAfterViewInit(){
    this.initMap();
  }

  private initMap = async () => {
    
      // Request needed libraries.
      const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
      const map = new Map(document.getElementById('map') as HTMLElement,
          {
            mapId: "4504f8b37365c3d0",
            center: {lng: this.selectedLongitude, lat: this.selectedLatitude },
            zoom: 13,
            clickableIcons: false
          }
      );

      map.addListener('click', (event: any)=>{this.handleMapClick(event, map)});
      google.maps.event.addListener(map, 'rightclick', (event: any) => {this.handleMarkerRightClick(event);});


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
          <div class='contentContainer'>
            <div style='align-content: center'>
              <img src=${incident.photoUrl} style='max-width: 12rem; max-height: 12rem;' onerror="this.src='assets/images/fallback/notFound.png';"/>
            </div>
            <div class='descriptionContainer'>
              <h3 style='text-align: center; font-size: larger'>Description</h3>
              <div style='font-size: 0.6rem'>${incident.description}</div>
            </div>
            <div class='timeContainer'>
              <h3 style='text-align: center; font-size: larger'>Time of Incident</h3>
              <div style='font-size: 0.6rem'>${incident.timeOfIncident}</div>
            </div>
          </div>`;
          

          infoWindow.setContent(contentString);
          infoWindow.open(marker.map, marker);
      });
  });
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

  public async handleLoadedMarkerClick(marker: any, incident: Incident){ //DELETE THIS AFTER TESTING I DON'T NEED IT
    console.log(marker);
    console.log(incident);

    const {Map, InfoWindow} : any = await google.maps.importLibrary("maps");

    const map = new google.maps.Map(

      document.getElementById("map") as HTMLElement,
      this.options
    );

    const contentString = "<div>Ja sam taj!</div>";

    let infoWindowOptions = {
      content: contentString,
      headerContent: 'bitch',
      map: map,
      position: {lng: incident.longitude, lat: incident.latitude}
    }

    let myInfoWindow = new InfoWindow(infoWindowOptions);

    myInfoWindow.open();
  }

  public handleMarkerRightClick(event: google.maps.MapMouseEvent){
    
    this.isLocationSelected = false;
    this.selectedMarker.map = null; 
    
    this.cdr.detectChanges(); //Detect changes on the UI
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
