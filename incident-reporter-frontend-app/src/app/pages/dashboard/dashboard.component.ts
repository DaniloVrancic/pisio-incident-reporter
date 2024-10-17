import { CommonModule, formatDate } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
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

interface month {
  value: string;
  viewValue: string;
}

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

export interface trafficChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface salesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hourRate: number;
  classes: number;
  priority: string;
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
  public trafficChart!: Partial<trafficChart> | any;
  public salesChart!: Partial<salesChart> | any;

  public lastYearOfIncidentsCounts: IndexValue[] | any;
  public last30DaysOfIncidentsCounts: IndexValue[] | any;
  public last7DaysOfIncidents: IndexValue[] | any;
  public incidentTypesCounts: IndexValue[] | any;
  public incidentSubypesCounts: IndexValue[] | any;
  public incidentsInDaysOfWeekCounts: IndexValue[] | any;
  public incidentsInPartOfDayCounts: IndexValue[] | any;



  constructor(private statisticService: StatisticService) {

    

    // yearly breakup chart
    this.trafficChart = {
      series: [5368, 3500, 9000],
      labels: ['5368', 'Refferal Traffic', 'Oragnic Traffic'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#e7ecf0', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
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
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

    // mohtly earnings chart
    this.salesChart = {
      series: [
        {
          name: '',
          color: '#8763da',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }

  loadIncidentsInPartsOfDayChart(){
    const incidentsInPartsOfDayValues: number[] = (this.incidentsInPartOfDayCounts as IndexValue[]).map(inc => {return inc.value});
    const incidentsInPartsOfDayLabels: string[] = (this.incidentsInPartOfDayCounts as IndexValue[]).map(inc => {return inc.index});

    console.log("LOADED VALUES AND LABELS");
    console.log(incidentsInPartsOfDayValues)
    console.log(incidentsInPartsOfDayLabels);

    this.incidentsInPartsOfDayChart = {
      chart: {
        height: '400rem',
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
          enabled: true
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

  subs: MapsSubscriptionContainer = new MapsSubscriptionContainer();


  ngOnInit(): void {
    const today = new Date();
    let previousMonth = new Date(today);
    previousMonth.setFullYear(previousMonth.getFullYear() - 1);

    const formattedDate1 = formatDate(previousMonth, 'yyyy-MM-dd', 'en-US');
    const formattedDate2 = formatDate(today, 'yyyy-MM-dd', 'en-US');
    

    this.subs.add = this.statisticService.getIncidentsBetweenDates(formattedDate1, formattedDate2)
    .subscribe((result: IndexValue[]) => {
        
          this.lastYearOfIncidentsCounts = result;
          this.last30DaysOfIncidentsCounts = (this.lastYearOfIncidentsCounts as IndexValue[]).slice(-30);
          this.last7DaysOfIncidents = (this.last30DaysOfIncidentsCounts as IndexValue[]).slice(-7);
          
          console.log("getIncidentsBetweenDates: ");
          console.log(result);
          console.log("last30Days:");
          console.log(this.last30DaysOfIncidentsCounts);
          console.log("last7Days");
          console.log(this.last7DaysOfIncidents);
          
        });
    this.subs.add = this.statisticService.getTypeGroupCount()
        .subscribe((result: IndexValue[]) => { 
          this.incidentTypesCounts = result;
          console.log("getTypeGroupCount: ");
          console.log(result);
        });

    this.subs.add = this.statisticService.getSubtypeGroupCount()
        .subscribe((result: IndexValue[]) => { 
          this.incidentSubypesCounts = result;
          console.log("getSubtypeGroupCount: ");
          console.log(result);
        });
    this.subs.add = this.statisticService.getDaysInWeekCount()
        .subscribe((result: IndexValue[]) => { 
        this.incidentsInDaysOfWeekCounts = result;
        console.log("getDaysInWeekCount: ");
        console.log(result);
      });
    this.subs.add = this.statisticService.getPartOfDayGroups()
        .subscribe((result: IndexValue[]) => { 
        this.incidentsInPartOfDayCounts = result;
        console.log("getPartOfDayGroups: ");
        console.log(result);
        this.loadIncidentsInPartsOfDayChart();
      });
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }
}
