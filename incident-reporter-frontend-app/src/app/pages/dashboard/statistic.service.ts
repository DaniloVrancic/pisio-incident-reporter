import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexValue } from 'src/app/models/index-value';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  
  private statisticsUrl = environment.statisticsUrl;

  constructor(private http: HttpClient) { }

  // Get incident type group count
  getTypeGroupCount(): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_type_group_count`);
  }

  // Get incident subtype group count
  getSubtypeGroupCount(): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_subtype_group_count`);
  }

  // Get incident count by days in the week
  getDaysInWeekCount(): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_days_in_week_group_count`);
  }

  // Get incidents count by part of the day
  getPartOfDayGroups(): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_part_of_day_group`);
  }

  // Get incidents between two dates
  getIncidentsBetweenDates(startDate: string, endDate: string): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_incidents_between_dates`, { 
      params: { startDate, endDate }
    });
  }

  // Get incidents from a specific start date until now
  getIncidentsFromDate(startDate: string): Observable<IndexValue[]> {
    return this.http.get<IndexValue[]>(`${this.statisticsUrl}/get_incidents_from_date`, { 
      params: { startDate }
    });
  }


}
