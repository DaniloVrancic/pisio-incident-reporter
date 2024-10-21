import { Component, OnInit } from '@angular/core';
import { NplAnalysisService } from './npl-analysis.service';

@Component({
  selector: 'app-nlp-analysis',
  standalone: true,
  imports: [],
  templateUrl: './nlp-analysis.component.html',
  styleUrl: './nlp-analysis.component.scss'
})
export class AppNLPAnalysisComponent implements OnInit{

  public incidentSentiments: Map<string, any[]> = new Map<string, any[]>();
  
  constructor(public nlpService: NplAnalysisService){}

  ngOnInit(): void {
    if(this.incidentSentiments.size == 0){
      this.nlpService.getSentimentsForAllIncidents().subscribe((result: Map<string, any[]>) => {
        console.log(result);
        this.incidentSentiments = result;
      });
    }
  }
}
