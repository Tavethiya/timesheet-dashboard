import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
  DoughnutController
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-radial-chart',
  standalone: true,
  templateUrl: './radial-chart.component.html'
})
export class RadialChartComponent implements AfterViewInit, OnChanges {
  @Input() title!: string;
  @Input() data!: { tracked: number; expected: number };

  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chartInstance?: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['title']) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.renderChart();
    }
  }

  renderChart(): void {
    if (!this.chartRef) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context');
      return;
    }

    const expected = this.data.expected;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Tracked', 'Remaining'],
        datasets: [{
          data: [this.data.tracked, this.data.expected - this.data.tracked],
          backgroundColor: ['#4b5563', '#9ca3af'], // Medium gray and light gray
          borderColor: '#e5e7eb', // Light border for subtle contrast
          borderWidth: 2, // Slightly thicker border for better visibility
          borderRadius: 10 // Adds rounded edges to the doughnut segments
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom', // Move legend to the top
            labels: {
              color: '#374151', // Dark gray for legend text
              font: {
                size: 14,
                family: 'Arial, sans-serif'
              },
              padding: 20, // Space between legend items
              usePointStyle: true, // Use rounded points in the legend
              pointStyle: 'circle' // Set legend points to circles
            }
          },
          tooltip: {
            backgroundColor: '#f3f4f6', // Light gray tooltip background
            titleColor: '#111827', // Dark gray tooltip title
            bodyColor: '#374151', // Medium gray tooltip body text
            borderColor: '#d1d5db', // Light gray border
            borderWidth: 1
          }
        },
        cutout: '60%', // Adjusts the inner radius of the doughnut chart
        layout: {
          padding: 20 // Adds padding around the chart
        }
      },
      plugins: [
        {
          id: 'centerText',
          beforeDraw(chart) {
            const { width } = chart;
            const { height } = chart;
            const ctx = chart.ctx;
            ctx.save();

            // Center coordinates
            const centerX = width / 2;
            const centerY = height / 2;

            // Display Total
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#111827'; // Dark gray
            ctx.fillText(`Expected: ${expected}`, centerX, centerY - 20);

            // Display Tracked and Remaining
            ctx.font = '12px Arial';
            ctx.fillStyle = '#6b7280'; // Medium gray
            const tracked = chart.config.data?.datasets?.[0]?.data?.[0] || 0;
            const remaining = chart.config.data?.datasets?.[0]?.data?.[1] || 0;

            ctx.fillText(`Tracked: ${tracked}`, centerX, centerY + 10);
            ctx.fillText(`Remaining: ${remaining}`, centerX, centerY + 30);

            ctx.restore();
          }
        }
      ]
    };

    this.chartInstance = new Chart(ctx, config);
  }
}
