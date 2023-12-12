import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiComponent } from './add-multi.component';

describe('AddMultiComponent', () => {
  let component: AddMultiComponent;
  let fixture: ComponentFixture<AddMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
