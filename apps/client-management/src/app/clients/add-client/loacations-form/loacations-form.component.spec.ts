import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoacationsFormComponent } from './loacations-form.component';

describe('LoacationsFormComponent', () => {
  let component: LoacationsFormComponent;
  let fixture: ComponentFixture<LoacationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoacationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoacationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
