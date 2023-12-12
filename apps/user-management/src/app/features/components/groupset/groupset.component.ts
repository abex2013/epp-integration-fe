import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';
import { GroupSetService } from '../../Services/group-set.service';

@Component({
  selector: 'exec-epp-groupset',
  templateUrl: './groupset.component.html',
  styleUrls: ['./groupset.component.scss']
})
export class GroupsetComponent implements OnInit {
  isVisible = false;
  groupSet = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), 
      Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_ ]+$')]),
    Description: new FormControl('')
  });
  
  constructor(
    private groupSetService: GroupSetService,
    private router: Router,
    private notification: NotificationBar,
    private validator: FormValidator
  ) {}

  onAddNewRecord(): void {
    this.resetForm();
    this.isVisible = true;
  }
  resetForm(){
    this.groupSet.reset();
  }
  handleCancel(): void {
    this.isVisible = false;
  }


  onSaveGroup(): void{
    const dataToPost = this.groupSet.value;
    if(!this.groupSet.valid){
      Object.values(this.groupSet.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.groupSet.controls.Name.markAsTouched();
      this.groupSet.controls.Name.updateValueAndValidity();
    }
    else{
    this.groupSetService.createGroup(dataToPost).subscribe(
      () => {
        this.notification.showNotification({
          type: 'success',
          content: 'Group added successfully',
          duration: 5000,
        });
      },
      (err: any) => {
        this.notification.showNotification({
          type: 'error',
          content: 'Error, group not added. Please try again',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );
    }
        
    this.groupSet.reset();
  }
  ngOnInit(): void {
  } 
 
}
