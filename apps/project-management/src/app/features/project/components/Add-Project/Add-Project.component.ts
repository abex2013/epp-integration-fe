import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import {
  Client,
  ClientService,
  Employee,
  EmployeeService,
  Project,
  ProjectCreate,
  projectResourceType,
  ProjectService,
  ProjectStatus,
  ProjectStatusService,
} from '../../../../core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'exec-epp-Add-Project',
  templateUrl: './Add-Project.component.html',
  styleUrls: ['./Add-Project.component.css'],
})
export class AddProjectComponent implements OnInit {
  position: NzTabPosition = 'left';
  projectStatus!: boolean;
  selectedStatus!: string;
  typeSelected?: string;
  currentNameSubject$ = new BehaviorSubject('');
  typed!: string;
  projectTypeSelected = this.currentNameSubject$.getValue();

  validateForm!: FormGroup;
  userSubmitted!: boolean;
  currentDate = Date.now.toString();
  projectCreate: ProjectCreate = {} as ProjectCreate;
  clients = [] as Client[];
  employees = [] as Employee[];
  projects = [] as Project[];
  projectStatuses = [] as ProjectStatus[];
  projectNameExits = false;
  enableAddResourceTab = false;
  projectNameExitsErrorMessage = '';
  projectStartdDate = {} as Date;
  disallowResource = true;


  resources: projectResourceType[] = [] as projectResourceType[];

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  @ViewChild('startDatePicker') startDatepicker!: NzDatePickerComponent;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private modalService: NzModalService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private projectStatusService: ProjectStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();
    this.apiCalls();
    this.projectMapper();
    this.typeChanged();
    this.validateParojectNameWithClient();
  }

  projectMapper() {
    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        this.enableAddResourceTab = true;
        this.projectStartdDate = this.validateForm.controls.startValue.value;
        this.projectCreate.ProjectName =
          this.validateForm.controls.projectName.value;

        this.projectCreate.SupervisorGuid =
          this.validateForm.controls.supervisor.value;
        this.projectCreate.StartDate =
          this.validateForm.controls.startValue.value;
        this.projectCreate.ProjectType =
          this.validateForm.controls.projectType.value;
        this.projectCreate.ProjectStatusGuid =
          this.validateForm.controls.status.value.Guid;
        //this.projectCreate.ClientGuid = this.validateForm.controls.client.value;
        this.projectCreate.Description =
          this.validateForm.controls.description.value;

        if (this.projectCreate.ProjectType=='Internal')
        {
          for (let i = 0; i < this.clients.length; i++) {
            if (
              this.clients[i].ClientName.toLowerCase() ===
              'Excellerent'.toString().toLowerCase()
            ) {
              this.projectCreate.ClientGuid = this.clients[i].Guid;
            }
          }
        }
        else{
          this.projectCreate.ClientGuid = this.validateForm.controls.client.value;
        }

        if (this.validateForm.controls.status.value.AllowResource) {
          this.disallowResource = false;
        } else {
          this.disallowResource = true;
        }
      } else {
        this.projectCreate = {} as ProjectCreate;
      }
    });
  }

  typeChanged() {
    this.validateForm.controls.projectType.valueChanges.subscribe(() => {
      if (this.validateForm.controls.projectType.value == 'Internal') {
        for (let i = 0; i < this.clients.length; i++) {
          if (
            this.clients[i].ClientName.toLowerCase() ===
            'Excellerent'.toString().toLowerCase()
          ) {
            this.projectCreate.ClientGuid = this.clients[i].Guid;
          }
        }
      } else {
        this.projectCreate.ClientGuid = this.validateForm.controls.client.value;
      }
    });
  }

  apiCalls() {
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });

    this.clientService.getAll().subscribe((response: any) => {
      this.clients = response.Data;
    });

    this.projectStatusService.getAll().subscribe((res) => {
      this.projectStatuses = res;
    });

    this.projectService.getProjects().subscribe((response: Project[]) => {
      this.projects = response;
    });
  }

  validateParojectNameWithClient() {
    this.validateForm.controls.client.valueChanges.subscribe(() => {
      let found = false;

      if (
        this.validateForm.controls.client.valid &&
        this.validateForm.controls.projectName.valid
      ) {
        if (this.projects != [])
          for (let i = 0; i < this.projects.length; i++) {
            if (
              this.validateForm.controls.client.value ==
                this.projects[i].Client.Guid &&
              this.validateForm.controls.projectName.value.toLowerCase() ===
                this.projects[i].ProjectName.toString().toLowerCase()
            ) {
              found = true;

              this.projectNameExitsErrorMessage =
                'Project name already exists by  this ' +
                this.projects[i].Client.ClientName +
                ' client';

              break;
            }
          }
      }

      if (found == true) {
        this.projectNameExits = true;

        this.validateForm.controls.projectName.setErrors({ invalidName: true });
      } else {
        this.projectNameExits = false;
        this.validateForm.controls.projectName.setErrors({
          invalidName: false,
        });
        this.validateForm.controls.projectName.updateValueAndValidity();
      }
    });
  }

  createRegistrationForm() {
    this.validateForm = this.fb.group({
      projectName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      client: ['Excellerent', [Validators.required]],
      projectType: ['External', [Validators.required]],
      status: [null, [Validators.required]],
      supervisor: [null, [Validators.required]],
      startValue: [null, [Validators.required]],
      endValue: [null],
      description: [''],
    });
  }

  onSubmit() {
    if (this.validateForm.controls.endValue.value != null)
      this.projectCreate.EndDate = this.validateForm.controls.endValue.value;
    else this.projectCreate.EndDate = '';

    if (this.validateForm.controls.status.value.AllowResource == true)
      this.projectCreate.AssignResource = this.resources;
    else this.projectCreate.AssignResource = [] as projectResourceType[];
    this.projectService.createProject(this.projectCreate);

    this.router.navigateByUrl('');
  }

  onReset() {
    this.userSubmitted = false;

    this.router.navigateByUrl('');
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.validateForm.controls.endValue.value) {
      return false;
    }
    return (
      startValue.getTime() > this.validateForm.controls.endValue.value.getTime()
    );
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.controls.startValue.value) {
      return false;
    }
    return (
      endValue.getTime() <=
      this.validateForm.controls.startValue.value.getTime()
    );
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {}

  //Getter methods

  get projectName() {
    return this.validateForm.controls.projectName as FormControl;
  }

  get clientName() {
    return this.validateForm.controls.client as FormControl;
  }

  get projectType() {
    return this.validateForm.controls.projectType as FormControl;
  }

  get status() {
    return this.validateForm.controls.status as FormControl;
  }

  get supervisor() {
    return this.validateForm.controls.supervisor as FormControl;
  }

  get startValue() {
    return this.validateForm.controls.startValue as FormControl;
  }

  get endValue() {
    return this.validateForm.controls.endValue as FormControl;
  }

  updateProjectResourseList(resources: projectResourceType[]) {
    this.resources = resources;
  }

  selectChangeHandler(event: any) {
    this.selectedStatus = event.target.value;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to leave Project Details unsaved?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.router.navigateByUrl(''),
      nzCancelText: 'No',
    });
  }
}
