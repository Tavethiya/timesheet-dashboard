import { Component } from '@angular/core';
import rawData from '../../assets/data/dashboard-data.json';
import { InfoCardComponent } from '../shared/components/info-card/info-card.component';
import { RadialChartComponent } from '../shared/components/radial-chart/radial-chart.component';
import { BarChartComponent } from '../shared/components/bar-chart/bar-chart.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ProgresListComponent } from "../shared/components/progress-list/progress-list.component";
import { DashboardData, YearData } from '../shared/models/dashboard-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoCardComponent, RadialChartComponent, BarChartComponent, FormsModule, CommonModule, ProgresListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  fullData: DashboardData = rawData;
  years: string[] = Object.keys(rawData);
  selectedYear: string = this.years[0];
  data: YearData = this.fullData[this.selectedYear];

  onYearChange(year: string) {
    this.selectedYear = year;
    this.data = this.fullData[year];
  }

}
