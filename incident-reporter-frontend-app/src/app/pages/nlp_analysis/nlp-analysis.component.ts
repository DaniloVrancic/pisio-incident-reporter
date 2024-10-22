import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NplAnalysisService } from './npl-analysis.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MapsSubscriptionContainer } from '../map/map/map-subscriptions-container';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { Router } from '@angular/router';


export interface sentimentsChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}
@Component({
  selector: 'app-nlp-analysis',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule, 
    MatListModule,
    MatCardModule,
    NgApexchartsModule],
  templateUrl: './nlp-analysis.component.html',
  styleUrl: './nlp-analysis.component.scss'
})
export class AppNLPAnalysisComponent implements OnInit, OnDestroy{

  expanded: string | null = null;
  selectedIncidentSentimentId: number | null = null;
  subs: MapsSubscriptionContainer = new MapsSubscriptionContainer();

  public sentimentsChart!: Partial<sentimentsChart> | any;

  public incidentSentiments: Map<string, any[]> = new Map<string, any[]>();
  
  constructor(public nlpService: NplAnalysisService, private cdr: ChangeDetectorRef, 
    private authService: AuthGoogleService, private router: Router){}

  ngOnInit(): void {
   
      if(!this.authService.isLoggedIn())
      {
        alert("User needs to be logged in!")
        this.router.navigate(['']);
        return;
      }
      this.subs.add = this.nlpService.getSentimentsForAllIncidents().subscribe((result: Map<string, any[]>) => {
       
        this.incidentSentiments = new Map(Object.entries(result));

        let incidentNames : string[] = [];
        let incidentSizes : number[] = [];

        for(const [key, value] of this.incidentSentiments){
          incidentNames.push(key);
          incidentSizes.push(value.length);
        }

        this.sentimentsChart = {
          series: incidentSizes,
          labels: incidentNames,
          chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
              show: false,
            },
            width: 700,
            height: 320,
            colors: [
              '#d8eb26',  // Lime green
              '#e7ecf0',  // Light gray-blue
              '#6c5ce7',  // Purple
              '#74b9ff',   // Sky blue
              '#f05454',  // Red-orange
              '#fb977d',  // Soft coral
            ],
          },
          
          stroke: {
            show: false,
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '11px',
              fontWeight: 'bolder',
            },
          },
          legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'center', 
            floating: true,
            fontSize: '18px',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            width: 300,
            height: undefined,
            tooltipHoverFormatter: undefined,
            customLegendItems: [],
            offsetX: -300,
      
            labels: {
              colors: undefined,
              useSeriesColors: false
            },
            markers: {
              size: 7,
              shape: undefined,
              strokeWidth: 1,
              fillColors: undefined,
              customHTML: undefined,
              onClick: undefined,
              offsetX: 0,
              offsetY: 0
            },
            itemMargin: {
              horizontal: 20,
              vertical: 3
            },
          },
          responsive: [
            {
              breakpoint: 991,
              options: {
                chart: {
                  width: 300,
                },
              },
            },
          ],
        }; //end of chart definition
        
        this.cdr.detectChanges();
      }); //end of subscribe
    
    
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }
}
