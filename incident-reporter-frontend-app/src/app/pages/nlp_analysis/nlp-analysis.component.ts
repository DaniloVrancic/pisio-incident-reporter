import { Component, OnInit } from '@angular/core';
import { NplAnalysisService } from './npl-analysis.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nlp-analysis',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule, 
    MatListModule],
  templateUrl: './nlp-analysis.component.html',
  styleUrl: './nlp-analysis.component.scss'
})
export class AppNLPAnalysisComponent implements OnInit{

  expanded: string | null = null;
  selectedIncidentSentimentId: number | null = null;

  public incidentSentiments: Map<string, any[]> = new Map<string, any[]>();
  
  constructor(public nlpService: NplAnalysisService){}

  ngOnInit(): void {
    if(this.incidentSentiments.size == 0){
      this.nlpService.getSentimentsForAllIncidents().subscribe((result: Map<string, any[]>) => {
        console.log(result);
        this.incidentSentiments = new Map(Object.entries(result));
        for(const [key, value] of this.incidentSentiments){
          console.log(key);
        }
      });
    }
  }
}
