import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfInterestComponent } from './area-of-interest.component';

describe('AreaOfInterestComponent', () => {
  let component: AreaOfInterestComponent;
  let fixture: ComponentFixture<AreaOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaOfInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
