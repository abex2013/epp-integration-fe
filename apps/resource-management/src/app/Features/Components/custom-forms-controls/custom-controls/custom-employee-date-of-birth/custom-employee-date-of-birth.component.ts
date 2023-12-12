import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-employee-date-of-birth',
    templateUrl: './custom-employee-date-of-birth.component.html',
    styleUrls: ['./custom-employee-date-of-birth.component.scss']
  })
export class CustomEmployeeDateofBirthComponent implements OnInit {

    label = 'Date of Birth'
    startingDate = new Date()
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true

    constructor() {
    }

    ngOnInit(): void {
    }

}