import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppdashboardComponent } from './eppdashboard.component';

describe('EppdashboardComponent', () => {
  let component: EppdashboardComponent;
  let fixture: ComponentFixture<EppdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
