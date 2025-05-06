import { Component, Input, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { EmployeeData } from '../../models/dashboard-data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-list',
  imports: [CommonModule],
  templateUrl: './progress-list.component.html'
})
export class ProgresListComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() employeeData!: EmployeeData[];

  ngAfterViewInit(): void {
    // this.renderChart();
  }

}


