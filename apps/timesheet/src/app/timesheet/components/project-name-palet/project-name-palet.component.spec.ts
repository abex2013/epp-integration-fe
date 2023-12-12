import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNamePaletComponent } from './project-name-palet.component';

describe('ProjectNamePaletComponent', () => {
  let component: ProjectNamePaletComponent;
  let fixture: ComponentFixture<ProjectNamePaletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNamePaletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNamePaletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
