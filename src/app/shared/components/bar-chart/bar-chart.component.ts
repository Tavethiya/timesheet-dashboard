import { Component, Input, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto'; // Auto-registers all controllers/elements

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() labels!: string[];
  @Input() data!: number[];
  @ViewChild('barChartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  chartInstance!: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels']) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.renderChart();
    }
  }


  renderChart() {
    if (!this.chartRef) return;
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context');
      return;
    }
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Allocated Hours',
            data: this.data, // Tracked data
            backgroundColor: '#4b5563', // Dark gray for tracked
            borderRadius: 10, // Rounded corners for bars
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Show legend for Tracked and Remaining
            labels: {
              color: '#374151', // Dark gray for legend text
              font: {
                size: 14,
                family: 'Arial, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true, // Enable stacking for x-axis
            ticks: {
              color: '#4b5563' // Dark gray for x-axis labels
            },
            grid: {
              display: false // Removes x-axis grid lines
            }
          },
          y: {
            beginAtZero: true, // Start y-axis at zero
            stacked: true, // Enable stacking for y-axis
            ticks: {
              color: '#4b5563' // Dark gray for y-axis labels
            },
            grid: {
              display: false // Removes y-axis grid lines
            }
          }
        }
      }
    });
  }

}


