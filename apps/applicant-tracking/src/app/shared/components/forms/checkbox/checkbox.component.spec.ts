import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxComponent } from './checkbox.component';

describe('InputComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
