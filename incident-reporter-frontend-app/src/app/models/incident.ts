import { IncidentSubtype } from "./incident-subtype";

export interface Incident {
    id: number;
    description: string | null;
    incidentSubtype: IncidentSubtype;
    photoUrl: string | null;
    status: Status;
    timeOfIncident: string; // ISO 8601 format
    latitude: number;
    longitude: number;
    user_token: string | null;
    content: any;
  }

  export enum Status {
    REQUESTED = "REQUESTED",
    APPROVED = "APPROVED"
  }