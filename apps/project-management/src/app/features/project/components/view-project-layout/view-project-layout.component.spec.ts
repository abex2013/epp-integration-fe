import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectLayoutComponent } from './view-project-layout.component';

describe('ViewProjectLayoutComponent', () => {
  let component: ViewProjectLayoutComponent;
  let fixture: ComponentFixture<ViewProjectLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
