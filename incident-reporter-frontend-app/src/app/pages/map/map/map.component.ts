
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
import { Observable, Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { MapsSubscriptionContainer } from './map-subscriptions-container';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';


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
  providers: [MapService, AuthGoogleService]
  
})

export class AppMapComponent implements OnInit, AfterViewInit, OnDestroy {

  isInitialized: boolean = false;


  isLocationSelected: boolean = false;

  allIncidentSubtypes: IncidentSubtype[] = [];
  allIncidentTypes: IncidentType[] = [];
  


  private mapSubsContainer: MapsSubscriptionContainer = new MapsSubscriptionContainer();
  public profileChangeObservable: Observable<any> | undefined;

  mapClickListener: any = null;
  mapRightClickListener: any = null;
  mapMarkerClickListener: any = null;

  markersMap: Map<number, any> = new Map();

  imageDOM: any = null;
  loggedDOM: any = null;

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(private mapService: MapService, 
              public mapStateService: MapStateService, 
              private cdr: ChangeDetectorRef,
              private authGoogleService: AuthGoogleService,
              public router: Router){
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

  ngOnInit(): void {
    try{
      
      let incidentTypeIdSet = new Set<number>();

      this.readSubtypesAndTypes(incidentTypeIdSet);

      this.mapStateService.readIncidentsAndLoadMarkers();

      this.mapSubsContainer.add = this.mapStateService.mapStateChanged.subscribe(() => { //'add' is a setter in the MapSubscriptionsContainer class
        this.cdr.detectChanges(); 
      });
 
    }
    catch(error: any){
      console.error("Error happened during fetching incident subtypes.\n" + error);
    }
  }

  ngOnDestroy(): void {
      this.mapSubsContainer.dispose();
  }

 
  



  ngAfterViewInit(){
    this.imageDOM = document.getElementById('profile-pic') as HTMLImageElement;
    this.loggedDOM = document.getElementById('logged-div');
    this.initMap();
    window['approveIncident'] = this.approveIncident.bind(this);
    window['rejectIncident'] = this.deleteIncident.bind(this);
    
    this.cdr.detectChanges(); 
  }

  showMarker(id: number){
    console.log(this.markersMap.get(id));
  }

  private initMap = async () => {
    
      // Request needed libraries.
      const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      
    
      const centerLatitude: number = 44.79807782849736;
      const centerLongitude: number = 20.45847839252972;
    this.mapStateService.initializeMap(centerLatitude, centerLongitude, document.getElementById('map'));


    const map = this.mapStateService.map;
}

approveIncident(incidentId: number) {
  let updatedIncident: any = {id: incidentId, status: Status.APPROVED};
  this.mapSubsContainer.add = this.mapService.updateIncident(updatedIncident)
                                             .subscribe(result =>{
                                               
                                              const pathToPhoto = `assets/markers/${result.incidentSubtype.subtype}-marker.png`;
                                              let mapMarker: any = this.markersMap.get(result.id);
                                              let imgTag : HTMLImageElement | undefined = undefined;
                                              try{
                                                imgTag = mapMarker.src as any;
                                                if(imgTag != undefined){
                                                  imgTag.src = pathToPhoto;
                                                }
                                              }
                                              catch(error){
                                                console.error(error);
                                                if(imgTag != undefined){
                                                  imgTag.src = `assets/markers/type_icons/other-marker.png`;
                                                                       }
                                              };
                                              this.cdr.detectChanges();
                                              window.alert('Approved Incident with ID: ' + incidentId);
                                              this.refreshMap();
                                             })
                                      }

deleteIncident(incidentId: number) {
  this.mapSubsContainer.add = this.mapService.deleteIncident(incidentId).subscribe(returnedId => {
    if(returnedId === -1){
      return;
    }
    else{
      this.mapStateService.currentlyUsedIncidents = this.mapStateService.allIncidents;
      this.mapStateService.allIncidents = this.mapStateService.allIncidents?.filter(incident => {return incident.id != returnedId});
      this.mapStateService.currentlyUsedIncidents = this.mapStateService.currentlyUsedIncidents?.filter(incident => {return incident.id != returnedId});
      this.mapStateService.filteredIncidents = this.mapStateService.filteredIncidents.filter(incident => {return incident.id != returnedId});
      
      window.alert('Deleted Incident with ID: ' + incidentId);
      this.refreshMap();
    }
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
  

  openAddLocationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    
    let loginToken: string | null = null;
    if(this.authGoogleService.getToken() != null){
      loginToken = this.authGoogleService.getToken();
    }

    this.dialog.open(AddLocationDialogComponent, {
      width: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        incidentTypes: this.allIncidentTypes,
        incidentSubtypes: this.allIncidentSubtypes,
        latitude: this.mapStateService.selectedLatitude,
        longitude: this.mapStateService.selectedLongitude,
        userId: loginToken
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
        latitude: this.mapStateService.selectedLatitude,
        longitude: this.mapStateService.selectedLongitude
      }
    });
  }

  refreshMap(){ //Navigates to component that redirects back to route: '', useful for reloading markers
    this.router.navigateByUrl('/refresh');
  }

}
