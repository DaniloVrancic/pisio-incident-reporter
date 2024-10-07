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
  providers: [provideNativeDateAdapter(), MapService]
})
export class FilterLocationsDialogComponent {

  incidentTypes: IncidentType[] = [];
  incidentSubtypes: IncidentSubtype[] = [];
  selectedLongitude : number = 181;
  selectedLatitude : number = 181;

  selectedSubtypeId: number | null = null;
  selectedDescription: string | null = "";
  selectedImage: string | null = null;
  expanded: number | null = null;

  selectedDate: any = null;

  errorMessage: string = "";

  maxDate: Date = new Date();

  profilePictureFormControl = new FormControl(null);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { incidentTypes: IncidentType[], incidentSubtypes: IncidentSubtype[],
    latitude: number, longitude: number}, private mapService: MapService) {
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
  console.log("CONFIRM CLICKED!");
  }
}
