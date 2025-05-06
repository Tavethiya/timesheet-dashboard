import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresListComponent } from './progress-list.component';

describe('ProgresListComponent', () => {
  let component: ProgresListComponent;
  let fixture: ComponentFixture<ProgresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
