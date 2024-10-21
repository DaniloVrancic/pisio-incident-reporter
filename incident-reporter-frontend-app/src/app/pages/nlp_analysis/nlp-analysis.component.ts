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

  
  constructor(public nlpService: NplAnalysisService){}

  ngOnInit(): void {
      
  }

}
