import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NzSelectModeType } from "ng-zorro-antd/select";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-select-multiple',
    templateUrl: './custom-select-multiple.component.html',
    styleUrls: ['./custom-select-multiple.component.scss']
  })
export class CustomSelectMultipleComponent implements OnInit {

    @Input() list$: Observable<SelectOptionModel[]> = of([])
    @Input() label = 'Nationality(ies)'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() maxChoices = 2
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    errMessage = ''

    constructor() {
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}