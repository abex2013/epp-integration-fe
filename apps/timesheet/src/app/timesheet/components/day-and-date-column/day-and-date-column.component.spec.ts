import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAndDateColumnComponent } from './day-and-date-column.component';

describe('DayAndDateColumnComponent', () => {
  let component: DayAndDateColumnComponent;
  let fixture: ComponentFixture<DayAndDateColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAndDateColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAndDateColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
