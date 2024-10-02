import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { IncidentType } from 'src/app/models/incident-type';

@Component({
  selector: 'app-add-location-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './add-location-dialog.component.html',
  styleUrl: './add-location-dialog.component.scss'
})
export class AddLocationDialogComponent {
  incidentTypes: IncidentType[] = [];
  incidentSubtypes: IncidentSubtype[] = [];

  selectedSubtypeId: number | null = null;
  selectedDescription: string | null = "";
  expanded: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { incidentTypes: IncidentType[], incidentSubtypes: IncidentSubtype[] }) {
    this.incidentTypes = data.incidentTypes;
    this.incidentSubtypes = data.incidentSubtypes;
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

assignDescription(event: any){
  
  this.selectedDescription = event.target.value;
  console.log(this.selectedDescription);
}

}
