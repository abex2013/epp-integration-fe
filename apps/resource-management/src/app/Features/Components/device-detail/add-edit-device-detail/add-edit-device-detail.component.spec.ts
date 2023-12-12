import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeviceDetailComponent } from './add-edit-device-detail.component';

describe('AddEditDeviceDetailComponent', () => {
  let component: AddEditDeviceDetailComponent;
  let fixture: ComponentFixture<AddEditDeviceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeviceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
