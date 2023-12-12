import { Component, OnInit } from '@angular/core';

import { Data } from '@angular/router';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FamilyDetails } from '../../../Models/FamilyDetails';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-family-detail-view',
  templateUrl: './family-detail-view.component.html',
  styleUrls: ['./family-detail-view.component.scss'],
})
export class FamilyDetailViewComponent implements OnInit {
  isVisible = false;
  footer = null;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfFamilies: FamilyDetail[] = [];
  confirmModal?: NzModalRef;
  editId: string | null = null;
  IsEdit=false;
  editAt=-10;
  addButton="Add"
  emptyData=[];
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private employeeService:EmployeeService
  ) {
   
}

  addfamilies(): void {
    this.isVisible = true;
    this.addButton="Add"
    this.IsEdit=false;
    this.editAt=-10;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  startEdit(index: number): void {

      if(index>=0){
        this.addButton="Update"
        this.IsEdit=true;
        this.editAt=index;
        this.isVisible = true;
        this.form.generateFamilyDetailForm(this.form.allFamilyDetails[index]);
      }

  }

  stopEdit(): void {
    this.editId = null;

  }



    showConfirm(index:number): void {

      this.confirmModal = this.modalService.confirm({
        nzTitle: 'Do you want to delete this item?',
        nzContent: 'The action is not recoverable. ',
        nzOkType: 'primary',
        nzOkText: 'Yes',
        nzCancelText: 'No',
        nzOkDanger: true,
        nzOnOk: () =>
          new Promise((resolve, reject) => {
            if (index > -1) {
              this.form.allFamilyDetails.splice(index, 1);
              this.listOfFamilies=this.form.allFamilyDetails
              if(this.form.allFamilyDetails.length<1){
                this.form.allFamilyDetails= this.emptyData;
              }
             }
            setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
          }).catch(() => console.log('Error.'))
      });
    }


  exitModal() {
    this.isVisible = false;
  }

  resetForm(): void {
    this.form.familyDetail.reset();
  }

  add(): void {
    const families = this.form.getModelFamilyDetails() as FamilyDetail[];
   if(!this.IsEdit){
    this.form.allFamilyDetails=[...this.form.allFamilyDetails ,families[0]]


   }
   else{
    this.form.allFamilyDetails[this.editAt]=families[0];
    this.editAt=-10
    this.IsEdit=false;
   }
   if(this.form.familyDetail.valid){
    this.isVisible=false;
    this.form.familyDetail.reset();
  }
  }

  ngOnInit(): void {

    this.listOfFamilies;
  }
}
