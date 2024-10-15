import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from './cluster';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  private apiUrl = environment.analysisUrl;

  constructor(private http: HttpClient) { }

  findClusters(eps: number = 0.4, minIncidents: number = 4) : Observable<Map<number,Map<string, Cluster[]>>>//will be searching for minimally this number of incidents to form clusters
  {
    return this.http.get<any>(this.apiUrl + `/clusters?eps=${eps}&minIncidents=${minIncidents}`);
  }
}
