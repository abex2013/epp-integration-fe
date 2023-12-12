import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-gender',
    templateUrl: './custom-gender.component.html',
    styleUrls: ['./custom-gender.component.scss']
  })
export class CustomGenderComponent implements OnInit {

    genders$: Observable<string[]> = of(['Female', 'Male', 'Other'])
    label = 'Gender'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    errMessage = ''

    constructor() {
    }

    ngOnInit(): void {
    }

}