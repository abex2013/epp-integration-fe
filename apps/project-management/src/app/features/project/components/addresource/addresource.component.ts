import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup,  Validators } from '@angular/forms';
import {  ProjectResource,ProjectService,EmployeeService, projectResourceType, Employee  } from '../../../../core';
import { Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';




@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss']
})
export class AddresourceComponent implements OnInit {

  

  addResorceForm!: FormGroup;
  editResorceForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private employeeService:EmployeeService,
    private projectService:ProjectService
    ) { }


  resources: projectResourceType[]=[] as  projectResourceType[];
  employees!:Employee[];;
  asignedResourseToEdit!:ProjectResource;

  projectResources:ProjectResource[]=[]; 
  isModalVisible = false;  
  isEditMode=false;
  assignedDateError=false;

  @Output() addProjectResourceEvent = new EventEmitter<projectResourceType[]>();

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((response:Employee[])=>{
      this.employees=response;
     
      this.sortEmployees();
    });
    this.addResorceForm= this.fb.group({
      resource:[null,Validators.required],

      assignDate:[null,Validators.required],
    });
    this.editResorceForm= this.fb.group({
      resource:[null,Validators.required],
      assignDate:[null,Validators.required],
    });

    this.addResorceForm.valueChanges.subscribe(()=>{
      if(this.addResorceForm.valid)
    { const projectAssignDate= formatDate(this.addResorceForm.controls.assignDate.value,'yyyy-MM-dd','en_US');
     const  hiredDate = formatDate(this.addResorceForm.controls.resource.value.HiredDate,'yyyy-MM-dd','en_US');

        if( projectAssignDate <hiredDate )
          this.addResorceForm.controls.assignDate.setErrors({'invalidDate':true});
      else
          this.addResorceForm.controls.assignDate.setErrors(null);
         
        
        }   
    });


    this.editResorceForm.valueChanges.subscribe(()=>{
      if(this.editResorceForm.valid)
     { const  projectAssignDate = formatDate( this.editResorceForm.controls.assignDate.value,'yyyy-MM-dd','en_US');
      const  hiredDate = formatDate(this.editResorceForm.controls.resource.value.HiredDate,'yyyy-MM-dd','en_US');
    
         if( projectAssignDate <hiredDate)
        {
         this.editResorceForm.controls.assignDate.setErrors({'invalidDate':true});

        }
       else
          this.editResorceForm.controls.assignDate.setErrors(null);
    }
    else
    this.addResorceForm.controls.assignDate.setErrors(null);       
     });

}


get assignDateControl() {
  return   this.addResorceForm.controls.assignDate as FormControl;
}
  
get assignDateEditControl() {
  return   this.editResorceForm.controls.assignDate as FormControl;
}

  addResource()
  {   
    if (this.addResorceForm.valid) {
 this.projectResources.push({employee:this.addResorceForm.controls.resource.value,assignedDate:this.addResorceForm.controls.assignDate.value
        });
        this. isModalVisible= false;
        
this.resources.push({  employeeId:this.addResorceForm.controls.resource.value.Guid,
                    assignedDate:this.addResorceForm.controls.assignDate.value})

this.addProjectResourceEvent.emit(this.resources)
this.sortEmployees();
this.employees=this.employees.filter(s=>s.Guid!==this.addResorceForm.controls.resource.value.Guid);
this.addResorceForm.reset();
    } else {
      Object.values(this.addResorceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    
  }

  showModal(): void {

    this. isModalVisible = true;
  }

  handleCancel(): void {
    this. isModalVisible = false;
    this.editResorceForm.reset();
    this.addResorceForm.reset();
    this.isEditMode=false;

  }

  resetForm()
  {
     this.addResorceForm.controls.resource.setValue("");
     this.addResorceForm.controls.assignDate.setValue("");
   
  }
  resetEditForm()
  {
    this.editResorceForm.controls.assignDate.setValue("");
    this.editResorceForm.controls.resource.setValue("");
  }



  editResource(id:string)
  {
    this.addResorceForm.reset();
    const projectResource=this.projectResources.find(s=>s.employee.Guid==id);
    if(projectResource)
   {
   
    this.editResorceForm.controls.resource.setValue(projectResource.employee);
    this.editResorceForm.controls.assignDate.setValue(projectResource.assignedDate);
    this.asignedResourseToEdit=projectResource;
    this.isEditMode=true; 
    this.isModalVisible=true; 
   }
  }

  submitEditdValue()
  {

if( this.editResorceForm.valid)
{
  if(this. asignedResourseToEdit.employee.Guid!=this.editResorceForm.controls.resource.value.Guid)
    { this.employees.push(this.asignedResourseToEdit.employee);
      this.employees=this.employees.filter(s=>s.Guid!==this.editResorceForm.controls.resource.value.EmployeeGUid);
      this.sortEmployees();
    }
  this. asignedResourseToEdit.assignedDate= this.editResorceForm.controls.assignDate.value;
  this. asignedResourseToEdit.employee=this.editResorceForm.controls.resource.value;

  this.projectResources.map(s=>s.employee.Guid=== this. asignedResourseToEdit.employee.Guid?s:this. asignedResourseToEdit)  
 
  this.resources.map(s=>s.employeeId==this. asignedResourseToEdit.employee.Guid?s:
    {  employeeId: this.editResorceForm.controls.resource.value.Guid,
      assignedDate:this.editResorceForm.controls.assignDate.value,
      }
      )

      for(let i=0;i< this.resources.length;i++)
      {
         if(this.resources[i].employeeId==this. asignedResourseToEdit.employee.Guid)
                {  
                 this.resources[i]={  employeeId: this.editResorceForm.controls.resource.value.Guid,
                  assignedDate:this.editResorceForm.controls.assignDate.value};                
                
                 this.addProjectResourceEvent.emit(this.resources);
                 break;}
      }
       
 
  this. isEditMode=false;
  this.isModalVisible=false;
  this.editResorceForm.reset();
  this. asignedResourseToEdit={} as ProjectResource;
  } else {
    Object.values(this.editResorceForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  }

  removeResource(id:string)
  {
  const projectResourece=this.projectResources.find(s=>s.employee.Guid==id);
       if(projectResourece)
       this.employees.push(projectResourece.employee);
       this.sortEmployees();
  this.projectResources=this.projectResources.filter(s=>s.employee.Guid!==id);
  this.resources=this.resources.filter(s=>s.employeeId!=id);
  this.addProjectResourceEvent.emit(this.resources);

  }

  sortEmployees()
{
  this.employees.sort((a, b) => a.Name.localeCompare(b.Name))
}
}









