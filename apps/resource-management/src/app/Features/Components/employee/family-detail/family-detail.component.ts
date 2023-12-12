import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { FamilydetailService } from '../../../Services/FamilyDetails/familydetail.service';
import { Relationship } from '../../../Models/FamilyDetail/RelationshipModel';
import { RelationshipService } from '../../../Services/FamilyDetails/relationship.service';
import { Data, Router } from '@angular/router';

@Component({
  selector: 'exec-epp-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent implements OnInit {
  // It is put for the purpose of testing to make the component visible in routing
  // For other please, set the value to false
  @Input() isStandalone = false

  // relationships: Relationship[] = []
  // employees:FamilyDetail[]=[]
  // buttonClicked = 0
  // isnotMarried=0
  // isRelationShipRequired = true;
  // isFullNameRequired=true;
  // isGenderRequired=true;
  // isDoBRequired=true;
  // isRemarkRequired =true;
  // familydetails:FamilyDetail[]=[]
  // validateForm!: FormGroup;
  @Output() result: EventEmitter<{type: string, familydetails: FamilyDetail[]}> = new EventEmitter<{type: string, familydetails: FamilyDetail[]}>()
 //===========
 
 //==========================
  constructor(
    private fb: FormBuilder,
    private _relationshipService: RelationshipService,
    private _familyDetailService: FamilydetailService,
    private _employeeService: EmployeeService,
    private _router: Router
  ) {
    
    
  }
  

  ngOnInit(): void {

        
    }
    
  
   
}
