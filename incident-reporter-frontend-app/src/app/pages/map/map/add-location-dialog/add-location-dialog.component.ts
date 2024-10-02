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

  expanded: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { incidentTypes: IncidentType[], incidentSubtypes: IncidentSubtype[] }) {
    this.incidentTypes = data.incidentTypes;
    this.incidentSubtypes = data.incidentSubtypes;
  }

  getSubtypes(typeId: number): IncidentSubtype[] {
    return this.incidentSubtypes.filter(subtype => subtype.incidentType.id === typeId);
  }

}
