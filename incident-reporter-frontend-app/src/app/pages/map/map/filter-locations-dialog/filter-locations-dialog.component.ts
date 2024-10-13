import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MapService } from '../map.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IncidentType } from 'src/app/models/incident-type';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { FormControl } from '@angular/forms';
import { MapStateService } from '../map-state.service';
import { FilterSelection } from './filters-selection';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { Status } from 'src/app/models/incident';

@Component({
  selector: 'app-filter-locations-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './filter-locations-dialog.component.html',
  styleUrl: './filter-locations-dialog.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class FilterLocationsDialogComponent {

  incidentTypes: IncidentType[] = [];
  incidentSubtypes: IncidentSubtype[] = [];
  selectedLongitude : number = 181;
  selectedLatitude : number = 181;

  selectedSubtypeId: number | null = null;
  selectedDescription: string | null = "";
  selectedRadius : number | null = null;
  selectedImage: string | null = null;
  expanded: number | null = null;

  selectedDate: any = null;

  errorMessage: string = "";

  maxDate: Date = new Date();

  profilePictureFormControl = new FormControl(null);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { incidentTypes: IncidentType[], incidentSubtypes: IncidentSubtype[],
    latitude: number, longitude: number}, private mapService: MapService, 
    private mapStateService: MapStateService, 
    private router: Router,
    private authService: AuthGoogleService) {
    this.incidentTypes = data.incidentTypes;
    this.incidentSubtypes = data.incidentSubtypes;
    this.selectedLongitude = data.longitude;
    this.selectedLatitude = data.latitude;
  }

  getSubtypes(typeId: number): IncidentSubtype[] {
    return this.incidentSubtypes.filter(subtype => subtype.incidentType.id === typeId);
  }

  selectSubtype(subtypeId: number) {
    if(subtypeId === this.selectedSubtypeId){
      this.selectedSubtypeId = null;
    }
    else{
      this.selectedSubtypeId = subtypeId;
    }
  }

  capitalizeFirstLetter(sentence: string | null) {
    let mySentence: string = sentence as string;

    if(mySentence == undefined || mySentence == null){
      return undefined;
    }

    return mySentence.charAt(0).toUpperCase() + mySentence.slice(1);
}


onConfirmClicked() : void {
  let selectedFilters = {} as FilterSelection;

  if(this.selectedRadius == null){
      selectedFilters.latitude = null;
      selectedFilters.longitude = null
    }
    else{
      selectedFilters.latitude = this.selectedLatitude;
      selectedFilters.longitude = this.selectedLongitude;
    }
  
  selectedFilters.date = this.selectedDate;
  selectedFilters.subtype = this.selectedSubtypeId;

    let filteredIncidents = this.mapStateService.allIncidents;

    if (selectedFilters.radius != null) { //Apply the radius filter on this
    this.mapStateService.isFilterOn = true;
    const radiusInMeters : number = this.selectedRadius as number;
    filteredIncidents = filteredIncidents?.filter(incident => {
      const distance = this.calculateDistance(
        this.selectedLatitude, this.selectedLongitude,
        incident.latitude, incident.longitude
      );
      return distance <= radiusInMeters;
    });
    }

    if(selectedFilters.date){ //Apply the Between [selectedDate - Now] filter here
      this.mapStateService.isFilterOn = true;
      const selectedDate = new Date(this.selectedDate);
      const now = new Date();
      filteredIncidents = filteredIncidents?.filter(incident => {
      const incidentDate = new Date(incident.timeOfIncident);
      return incidentDate >= selectedDate && incidentDate <= now;
    });
    }
    if(selectedFilters.subtype){ //Apply the selected subtype ID here
      this.mapStateService.isFilterOn = true;
      filteredIncidents = filteredIncidents?.filter(incident => {
        return incident.incidentSubtype.id === selectedFilters.subtype;
      });
    }

    if(selectedFilters.subtype == null && selectedFilters.date == null && selectedFilters.radius == null){
      this.mapStateService.isFilterOn = false;
    }

    if(!this.authService.isLoggedIn()){
      filteredIncidents = filteredIncidents?.filter(incident =>{
        return incident.status === Status.APPROVED;
      });
    }

    this.mapStateService.filteredIncidents = filteredIncidents as any;
    this.mapStateService.currentlyUsedIncidents = filteredIncidents;
    this.refreshMap();
}

onCancelClicked(){
  this.mapStateService.isFilterOn = false;
  this.refreshMap();
}

dateTimeInput(event: any){
    this.selectedDate = event.target.value;    
}

radiusInput(event: any){
  const {value} = event.target;
    if(value.length > 0)
    {
      this.selectedRadius = value;
    }
    else{
      this.selectedRadius = null;
    }
  }


private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }
  
private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

private refreshMap(){
  this.router.navigateByUrl('/refresh');
}
}
