import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Incident } from 'src/app/models/incident';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { IncidentType } from 'src/app/models/incident-type';
import { MapService } from '../map.service';

@Component({
  selector: 'app-add-location-dialog',
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
  templateUrl: './add-location-dialog.component.html',
  styleUrl: './add-location-dialog.component.scss',
  providers: [provideNativeDateAdapter(), MapService]
})
export class AddLocationDialogComponent {
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

assignDescription(event: any){
  
  this.selectedDescription = event.target.value;
}

dateTimeInput(event: any){
  this.selectedDate = event.target.value;
}

onChangeFile(event: any)
  {
    const file = event.target.files[0];
    const reader = new FileReader();
    let selectedImage = this.selectedImage;

    let fileNameElement = document.getElementById("file-name") as HTMLElement | null;

    if(file === undefined)
    {
      (fileNameElement as HTMLElement).innerHTML = "";
      (fileNameElement as HTMLElement).style.display = 'inline';
    }
    else if (file != undefined && fileNameElement) {
      fileNameElement.innerHTML = file.name; // Assuming you want to display the file name
      fileNameElement.style.display = 'inline-block';
    } else {
      console.error("File name element not found.");
    }
    

    reader.onloadend = function(event : any) {
        const imgBase64 = event.target.result as string | null;
        
        // Assign the BASE64 string to this.userForRegister.avatar
        selectedImage = imgBase64
    };

    if(file != undefined)
    {
    reader.readAsDataURL(file);
    this.selectedImage = selectedImage;
    }
    else
    {
      this.selectedImage = null;
    }

  }

  onConfirmClicked() : void {
    let incidentToSend : Incident = {} as Incident;



    incidentToSend.latitude = this.selectedLatitude;
    incidentToSend.longitude = this.selectedLongitude;

    if(this.selectedSubtypeId === null){
      this.errorMessage = "Must select a category first.";
      return;
    }
    else if(this.selectedDescription === null || this.selectedDescription === ""){
      this.errorMessage = "Can't input an empty description.";
      return;
    }
    else{
      this.errorMessage = "";
    }

    if(this.selectedDate != null){
      const date = new Date(this.selectedDate);
      incidentToSend.timeOfIncident = date.toISOString();
    }
    
    if(this.selectedImage != null){
      incidentToSend.photoUrl = this.selectedImage;
    }

    incidentToSend.description = this.selectedDescription;
    incidentToSend.incidentSubtype = {id: this.selectedSubtypeId} as IncidentSubtype;

    try{
      console.log(incidentToSend);
      this.mapService.addIncident(incidentToSend).subscribe({
        next: result => {console.log(result);},
        error: error => {console.error(error);}
      });
    }
    catch(error: any){
      console.log(error);
      }
    }
    

    

    
}


