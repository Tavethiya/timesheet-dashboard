import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.component.html'
})
export class InfoCardComponent {
  @Input() client!: string;
  @Input() fiscalPeriod!: string;
  @Input() integrations!: string[];
}
