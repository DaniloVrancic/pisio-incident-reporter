import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { MapsSubscriptionContainer } from '../map/map/map-subscriptions-container';

@Injectable({
  providedIn: 'root'
})
export class NplAnalysisService implements OnInit, OnDestroy{

  private nlpUrl = environment.nlpUrl;

  public mapOfSentiments: Map<string, any[]> = new Map<string, any[]>();

  subs = new MapsSubscriptionContainer();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.subs.add = this.getSentimentsForAllIncidents().subscribe((result: Map<string, any[]>) => {
          this.mapOfSentiments = result;
          console.log(this.mapOfSentiments);
      });
  }

  getSentimentsForAllIncidents(): Observable<Map<string, any[]>> {
    return this.http.get<Map<string, any[]>>(this.nlpUrl + "/incident_sentiments");
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }


}
