import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingAddressFormComponent } from './operating-address-form.component';

describe('OperatingAddressFormComponent', () => {
  let component: OperatingAddressFormComponent;
  let fixture: ComponentFixture<OperatingAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingAddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
