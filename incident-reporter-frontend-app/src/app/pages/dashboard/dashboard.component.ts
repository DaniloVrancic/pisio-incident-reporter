import { CommonModule, formatDate, TitleCasePipe } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { StatisticService } from './statistic.service';
import { IndexValue } from 'src/app/models/index-value';
import { MapsSubscriptionContainer } from '../map/map/map-subscriptions-container';

export interface incidentsInPartsOfDayChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface typeOfIncidentChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface lastYearIncidentsChart {
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
  ],
})
export class AppDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public incidentsInPartsOfDayChart!: Partial<incidentsInPartsOfDayChart> | any;
  public typeOfIncidentChart!: Partial<typeOfIncidentChart> | any;
  public subtypeOfIncidentChart!: Partial<typeOfIncidentChart> | any;
  public lastYearIncidentsChart!: Partial<lastYearIncidentsChart> | any;
  public incidentPerDayOfWeekChart!: Partial<incidentsInPartsOfDayChart> | any;

  public lastYearOfIncidentsCounts: IndexValue[] | any;
  //public last30DaysOfIncidentsCounts: IndexValue[] | any;
  //public last7DaysOfIncidents: IndexValue[] | any;
  public incidentTypesCounts: IndexValue[] | any;
  public incidentSubypesCounts: IndexValue[] | any;
  public incidentsInDaysOfWeekCounts: IndexValue[] | any;
  public incidentsInPartOfDayCounts: IndexValue[] | any;


  subs: MapsSubscriptionContainer = new MapsSubscriptionContainer();

  constructor(private statisticService: StatisticService, private cdr: ChangeDetectorRef) {}

  loadIncidentsInPartsOfDayChart(){
    const incidentsInPartsOfDayValues: number[] = (this.incidentsInPartOfDayCounts as IndexValue[]).map(inc => {return inc.value});
    const incidentsInPartsOfDayLabels: string[] = (this.incidentsInPartOfDayCounts as IndexValue[]).map(inc => {return inc.index});

    //console.log("LOADED VALUES AND LABELS");
    //console.log(incidentsInPartsOfDayValues)
    //console.log(incidentsInPartsOfDayLabels);

    this.incidentsInPartsOfDayChart = {
      chart: {
        height: 400,
        type: 'bar',
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 4,
          endingShape: "rounded",
        },
      },
      dataLabels: {
          enabled: true,
          style: {
            fontSize: 22
          }
      },
      series: [
        {
          name: 'Incidents in Quarter of Day',
          data: incidentsInPartsOfDayValues,
          color: '#00bfff',
        }
      ],
      title: {
          text: 'Incidents per Day',
      },
      noData: {
        text: 'Loading...'
      },
      xaxis: {
        type: 'category',
        categories: incidentsInPartsOfDayLabels,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      markers: { size: 0 },
      legend: { show: false },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
      }
      
  }

  loadTypeOfIncidentDonutChart(){
    let titleCasePipe = new TitleCasePipe();

    const incidentTypeValues: number[] = (this.incidentTypesCounts as IndexValue[]).map(inc => {return inc.value});
    const incidentTypeLabels: string[] = (this.incidentTypesCounts as IndexValue[]).map(inc => {return titleCasePipe.transform(inc.index);});

    this.typeOfIncidentChart = {
      series: incidentTypeValues,
      labels: incidentTypeLabels,
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        width: 700,
        height: 320,
      },
      colors: ['#fb977d', '#0085db', '#d8eb26', '#e7ecf0'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: true,
                color: 'inherit',
              },
            },
          },
        },
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
        width: 400,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 250,  // Increased this to move the legend to the left
        offsetY: 0,
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
      tooltip: {
        enabled: false,
      },
    };
  }

  loadSubtypeOfIncidentDonutChart(){
    let titleCasePipe = new TitleCasePipe();

    const incidentSubtypeValues: number[] = (this.incidentSubypesCounts as IndexValue[]).map(inc => {return inc.value});
    const incidentSubtypeLabels: string[] = (this.incidentSubypesCounts as IndexValue[]).map(inc => {return titleCasePipe.transform(inc.index);});

    this.subtypeOfIncidentChart = {
      series: incidentSubtypeValues,
      labels: incidentSubtypeLabels,
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        width: 700,
        height: 320,
      },
      colors: [
        '#fb977d',  // Soft coral
        '#0085db',  // Bright blue
        '#d8eb26',  // Lime green
        '#e7ecf0',  // Light gray-blue
        '#f05454',  // Red-orange
        '#00b894',  // Teal green
        '#ffeaa7',  // Light yellow
        '#6c5ce7',  // Purple
        '#ff7675',  // Soft red
        '#55efc4',  // Mint green
        '#fdcb6e',  // Amber
        '#74b9ff'   // Sky blue
      ],
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 2,
              },
              value: {
                show: true,
                color: 'inherit',
              },
            },
          },
        },
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
        width: 400,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 250,  // Increased this to move the legend to the left
        offsetY: -25,
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
      tooltip: {
        enabled: false,
      },
    };
  }

  loadYearOfIncidentsAreaChart(){
    const lastYearIncidentsLabel: number[] = (this.lastYearOfIncidentsCounts as IndexValue[]).map(incident => {
      
      return new Date(formatDate(incident.index, 'dd MMM yyyy', 'en-US')).getTime(); 
    });

    const lastYearIncidentsValues: number[] = (this.lastYearOfIncidentsCounts as IndexValue[]).map(incident => {return incident.value;});
    //console.log(lastYearIncidentsLabel);

    const today = new Date();

    // Get the date 7 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    this.lastYearIncidentsChart= {
      series: [
        {
          name: "Incidents",
          data: lastYearIncidentsValues,
          color: '#FF00AA'
        },
      ],
      chart: {
        height: 500,
        width: 1200,
        type: "area",
        stacked: true,
      },
      xaxis: {
        type: 'datetime',
        categories: lastYearIncidentsLabel,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        min: thirtyDaysAgo.getTime(),
        max: today.getTime(),
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        },
      },
      plotOptions: {
        area: {
          fillTo: "origin",
          line: {
            curve: "smooth",
          },
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      tooltip: {
        enabled: true,
        x: {
          format: "dd/MM/yy"
        }
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
      
    };
  }

  loadIncidentsPerDayOfWeekChart(){
    const incidentsPerDayOfWeekValues: number[] = (this.incidentsInDaysOfWeekCounts as IndexValue[]).map(inc => {return inc.value});
    const incidentsPerDayOfWeekLabels: string[] = (this.incidentsInDaysOfWeekCounts as IndexValue[]).map(inc => {return inc.index});

    //console.log("LOADED VALUES AND LABELS");
    //console.log(incidentsPerDayOfWeekValues);
    //console.log(incidentsPerDayOfWeekLabels);

    this.incidentPerDayOfWeekChart = {
      series: [
        {
          name: "Incidents per Day of Week",
          data: incidentsPerDayOfWeekValues,
          color: "#23d950"
        }
      ],
      chart: {
        type: "bar",
        height: 400,
        foreColor: '#9ca0aa',
        fontFamily: 'inherit',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'inherit'
        }
      },
      stroke: {
        show: true,
        width: 3,
        colors: ["transparent"]
      },
      xaxis: {
        categories: incidentsPerDayOfWeekLabels,
      },
      yaxis: {
        title: {
          text: "Occurrences"
          
        }
      },
      noData: {
        text: 'Loading...'
      },
      labels: {
        style: { cssClass: 'grey--text lighten-2--text fill-color' },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {}
    };
  }




  ngOnInit(): void {
    const today = new Date();
    let previousMonth = new Date(today);
    previousMonth.setFullYear(previousMonth.getFullYear() - 1);

    const formattedDate1 = formatDate(previousMonth, 'yyyy-MM-dd', 'en-US');
    const formattedDate2 = formatDate(today, 'yyyy-MM-dd', 'en-US');
    

    this.subs.add = this.statisticService.getIncidentsBetweenDates(formattedDate1, formattedDate2)
    .subscribe((result: IndexValue[]) => {
        
          this.lastYearOfIncidentsCounts = result;
          //this.last30DaysOfIncidentsCounts = (this.lastYearOfIncidentsCounts as IndexValue[]).slice(-30);
          //this.last7DaysOfIncidents = (this.last30DaysOfIncidentsCounts as IndexValue[]).slice(-7);
          
          //console.log("getIncidentsBetweenDates: ");
          //console.log(result);
          //console.log("last30Days:");
          //console.log(this.last30DaysOfIncidentsCounts);
          //console.log("last7Days");
          //console.log(this.last7DaysOfIncidents);
          
          this.loadYearOfIncidentsAreaChart();
          this.cdr.detectChanges();
        });
    this.subs.add = this.statisticService.getTypeGroupCount()
        .subscribe((result: IndexValue[]) => { 
          this.incidentTypesCounts = result;
          //console.log("getTypeGroupCount: ");
          //console.log(result);
          this.loadTypeOfIncidentDonutChart();
          this.cdr.detectChanges();
        });

    this.subs.add = this.statisticService.getSubtypeGroupCount()
        .subscribe((result: IndexValue[]) => { 
          this.incidentSubypesCounts = result;
          //console.log("getSubtypeGroupCount: ");
          //console.log(result);
          this.loadSubtypeOfIncidentDonutChart();
          this.cdr.detectChanges();
        });
    this.subs.add = this.statisticService.getDaysInWeekCount()
        .subscribe((result: IndexValue[]) => { 
        this.incidentsInDaysOfWeekCounts = result;
        //console.log("getDaysInWeekCount: ");
        //console.log(result);
        this.loadIncidentsPerDayOfWeekChart();
        this.cdr.detectChanges();
      });
    this.subs.add = this.statisticService.getPartOfDayGroups()
        .subscribe((result: IndexValue[]) => { 
        this.incidentsInPartOfDayCounts = result;
        //console.log("getPartOfDayGroups: ");
        //console.log(result);
        this.loadIncidentsInPartsOfDayChart();
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }
}
