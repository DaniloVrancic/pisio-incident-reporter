import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {

  public selectedLongitude: number = 181;
  public selectedLatitude: number = 181;
  public savedMarkers: any[] = []; // store markers here
  public mapOptions: google.maps.MapOptions = {};
  public map: any;
  public isInitialized: boolean = false;
  public domWithMap: HTMLElement | null = null;

  constructor() {}

  initializeMap(startLatitude: number, startLongitude: number, containerDiv: any){
    this.selectedLongitude = startLongitude;
    this.selectedLatitude = startLatitude;

    this.mapOptions = {
      mapId: "4504f8b37365c3d0",
      center: {lng: this.selectedLongitude, lat: this.selectedLatitude },
      zoom: 13,
      clickableIcons: false
    };
    if(!this.isInitialized)
    {
      this.map = new google.maps.Map(containerDiv as HTMLElement, this.mapOptions); 
      this.domWithMap = document.getElementById('map');
    }
    
    
  }

  selectCoordinates(latitude: number, longitude: number){
    this.selectedLatitude = latitude;
    this.selectedLongitude = longitude;
  }

  setMarkers(markers: any[]){
    this.savedMarkers = markers;
  }

  
}
