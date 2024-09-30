import { IncidentType } from "./incident-type";

export interface IncidentSubtype {
    id: number;
    subtype: string | null;
    incidentType: IncidentType;
  }