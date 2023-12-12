import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToGroupComponent } from './user-to-group.component';

describe('UserToGroupComponent', () => {
  let component: UserToGroupComponent;
  let fixture: ComponentFixture<UserToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
