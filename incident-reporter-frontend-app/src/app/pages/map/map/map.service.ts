import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/models/incident';
import { IncidentSubtype } from 'src/app/models/incident-subtype';
import { IncidentType } from 'src/app/models/incident-type';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private incidentUrl = environment.incidentUrl;
  private incidentSubtypeUrl = environment.incidentSubtypeUrl;
  private incidentTypeUrl = environment.incidentTypeUrl;

  constructor(private http: HttpClient) { }

  // Get all incidents
  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.incidentUrl}/all`);
  }

  // Get a specific incident by ID
  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.incidentUrl}/${id}`);
  }

  // Add a new incident
  addIncident(incident: Incident): Observable<Incident> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Incident>(`${this.incidentUrl}/add`, incident, { headers });
  }

  // Update an existing incident
  updateIncident(incident: Incident): Observable<Incident> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Incident>(`${this.incidentUrl}/update`, incident, { headers });
  }

  // Get all incident subtypes
  getAllIncidentSubtypes(): Observable<IncidentSubtype[]> {
    return this.http.get<IncidentSubtype[]>(`${this.incidentSubtypeUrl}/all`);
  }

  // Get a specific incident subtype by ID
  getIncidentSubtypeById(id: number): Observable<IncidentSubtype> {
    return this.http.get<IncidentSubtype>(`${this.incidentSubtypeUrl}/${id}`);
  }

  // Add a new incident subtype
  addIncidentSubtype(subtype: IncidentSubtype): Observable<IncidentSubtype> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IncidentSubtype>(`${this.incidentSubtypeUrl}/add`, subtype, { headers });
  }

  // Update an existing incident subtype
  updateIncidentSubtype(subtype: IncidentSubtype): Observable<IncidentSubtype> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IncidentSubtype>(`${this.incidentSubtypeUrl}/update`, subtype, { headers });
  }

  // Get all incident types
  getAllIncidentTypes(): Observable<IncidentType[]> {
    return this.http.get<IncidentType[]>(`${this.incidentTypeUrl}/all`);
  }

  // Get a specific incident type by ID
  getIncidentTypeById(id: number): Observable<IncidentType> {
    return this.http.get<IncidentType>(`${this.incidentTypeUrl}/${id}`);
  }

  // Add a new incident type
  addIncidentType(type: IncidentType): Observable<IncidentType> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IncidentType>(`${this.incidentTypeUrl}/add`, type, { headers });
  }

  // Update an existing incident type
  updateIncidentType(type: IncidentType): Observable<IncidentType> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IncidentType>(`${this.incidentTypeUrl}/update`, type, { headers });
  }


}
