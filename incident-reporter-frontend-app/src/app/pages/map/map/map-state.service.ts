import { EventEmitter, Injectable } from '@angular/core';
import { Incident, Status } from 'src/app/models/incident';
import { MapService } from './map.service';
import { formatNumber } from '@angular/common';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { ClusterService } from 'src/app/services/analysis/cluster.service';
import { Cluster } from 'src/app/services/analysis/cluster';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {

  public selectedLongitude: number | undefined = undefined;
  public selectedLatitude: number | undefined = undefined;

  public mapOptions: google.maps.MapOptions = {};
  public map: google.maps.Map = {} as any;
  public isFilterOn = false;
  
  public mapStateChanged: EventEmitter<void> = new EventEmitter<void>();

  currentlyUsedMarkers: any[] = []; //Currently rendered markers

  allIncidents: Incident[] = [];
  loadedClusters: Map<string, Cluster[]> | null = null;
  approvedIncidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  public currentlyUsedIncidents: Incident[] | undefined = undefined;

  selectedMarker : any = null;
  isLocationSelected: boolean = false;

  constructor(private mapService: MapService, private authService: AuthGoogleService, private clusterService: ClusterService) {}


  tryUseFilteredIncidents(){
    if(this.isFilterOn == true){
      this.currentlyUsedIncidents = this.filteredIncidents;
    }
  }

  initializeMap(startLatitude: number, startLongitude: number, containerDiv: any){
    if(this.selectedLongitude == undefined && this.selectedLatitude == undefined)
    {
      this.selectedLongitude = startLongitude;
      this.selectedLatitude = startLatitude;
    }

    this.mapOptions = {
      mapId: "4504f8b37365c3d0",
      center: {lng: this.selectedLongitude as number, lat: this.selectedLatitude as number },
      zoom: 13,
      clickableIcons: false
    };

      this.map = new google.maps.Map(containerDiv as HTMLElement, this.mapOptions);
      this.map.addListener('click', (event: any)=>{this.handleMapClick(event, this.map)});
      google.maps.event.addListener(this.map, 'rightclick', (event: any) => {this.handleMarkerRightClick(event);});
      
    

    
    this.selectedMarker = null;
    this.isLocationSelected = false;
    this.emitMapStateChanged();
  }

  public readIncidentsAndLoadMarkers() //gets all incidents, and based on the login status it will assign allIncidents to be shown or only approved incidents
  {
      this.mapService.getAllIncidents().subscribe((result: Incident[]) => {
        this.allIncidents = result;
  
        this.approvedIncidents = this.allIncidents.filter((incident: Incident) => { return incident.status == Status.APPROVED; });
        
  
        if(this.authService.isLoggedIn())
        {
            this.currentlyUsedIncidents = this.allIncidents;
            
        }
        else{
            this.currentlyUsedIncidents = this.approvedIncidents;
        }

        this.tryUseFilteredIncidents()
        
          this.loadMarkers(this.currentlyUsedIncidents);
      });

      if(this.authService.isLoggedIn()){
        this.clusterService.findClusters().subscribe(result => {
          this.loadedClusters = result;
          console.log("LOADED CLUSTERS");
          console.log(this.loadedClusters);
          console.log("RESULT");
          console.log(result);
        })
      }
    
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

  /**
   * 
   * @param incidents either use filteredIncidents or allIncidents when using this method
   */
  public async loadMarkers(incidents: Incident[]) { 

    const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    if(this.currentlyUsedMarkers.length > 0){
      this.currentlyUsedMarkers.forEach((marker: any) => {
        marker.map = null;
      })
      this.currentlyUsedMarkers = [];
    }

    incidents.forEach((incident: Incident) => {
      const { latitude, longitude, incidentSubtype, status } = incident;
      const markerImage = this.getMarkerImage(incidentSubtype.subtype, status);

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

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: incident.latitude, lng: incident.longitude},
        content: incident.content,
        gmpClickable: true,
        title: incident.timeOfIncident,
        zIndex: 1000
      });

      const infoWindow = new InfoWindow();
      marker.addListener('click', ({ domEvent, latLng }: any) => {
        
        const { target } = domEvent;

        console.log(target);
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
            <img src=${this.mapService.getPhotoGetRequestString(incident.id)} style='max-width: 12rem; 
                                                                                     max-height: 12rem; 
                                                                                     margin: 1rem; 
                                                                                     border-radius: 0.8rem' 
                                                                              alt='Incident Photo' 
                                                                              onerror="this.src='assets/images/fallback/notFound.png';"/>
          </div>
          <div class='descriptionContainer'>
            <h3 style='text-align: center; font-size: 1.2rem'>Description</h3>
            <div style='font-size: 0.85rem'>${incident.description}</div>
          </div>
          <div class='timeContainer'>
            <h3 style='text-align: center; font-size: 1.2rem'>Time of Incident</h3>
            <div style='font-size: 0.85rem'>${incident.timeOfIncident}</div>
          </div>`;

        if(this.authService.isLoggedIn()){
          contentString +=  
            `
            <div class='button-container' style="padding: 1rem 0rem; display: flex; flex-direction: column; justify-content: space-around;">
            `+
            ((incident.status === Status.REQUESTED) ? `<button class='btn' onclick="approveIncident(${incident.id})">Approve</button>` : ``)
            +
              `<button class='btn' onclick="rejectIncident(${incident.id})">Remove</button>
            </div>
          </div>`;
        }
        else{
          contentString += 
        `</div>`;
        }
        

        infoWindow.setContent(contentString);
        infoWindow.open(marker.map, marker);
      
      });
      this.currentlyUsedMarkers.push(marker);
    });
}
  selectCoordinates(latitude: number, longitude: number){
    this.selectedLatitude = latitude;
    this.selectedLongitude = longitude;
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
      
      //this.cdr.detectChanges(); //DETECTS WHEN CHANGES ARE MADE
      this.emitMapStateChanged();
    }
  }

  
  public handleMarkerClick(clickEvent: google.maps.MapMouseEvent){
    this.selectedMarker.map = null;
    this.isLocationSelected = false;
    //this.cdr.detectChanges(); //DETECT CHANGES ON THE UI
    this.emitMapStateChanged();
  }

  public handleMarkerDragEnd(dragEvent: any, map: any){

    this.selectedLatitude = dragEvent.latLng?.toJSON().lat as number;
    this.selectedLongitude = dragEvent.latLng?.toJSON().lng as number;
    this.isLocationSelected = true;
    //this.cdr.detectChanges(); //DETECT CHANGES ON THE UI
    this.emitMapStateChanged();
  }

  public handleMarkerRightClick(event: google.maps.MapMouseEvent){
    
    this.isLocationSelected = false;
    if(this.selectedMarker){
      this.selectedMarker.map = null; 
    }
    
    //this.cdr.detectChanges(); //Detect changes on the UI
    this.emitMapStateChanged();
  }

  private emitMapStateChanged() {
    this.mapStateChanged.emit();
  }
  
}
