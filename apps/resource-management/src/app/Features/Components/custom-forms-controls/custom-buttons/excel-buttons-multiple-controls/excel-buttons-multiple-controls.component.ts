/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { ExcelControlResponseType } from "../../shared/excel-control-response-type.enum"
import { ExcelButtonResponse } from "../../shared/exel-control-response.model"

@Component({
    selector: 'excel-buttons-multiple-controls',
    templateUrl: './excel-buttons-multiple-controls.component.html',
    styleUrls: ['./excel-buttons-multiple-controls.component.scss']
})
export class ExcelButtonsMultipleControlsComponent implements OnInit {

    @Input() exMaxCount = 1
    @Input() exIndex = 0
    @Input() exCount = 1
    @Input() addText = '+ Add More'
    @Input() removeText = '- Remove'

    @Output() exResponse = new EventEmitter<ExcelButtonResponse>()

    constructor() {}

    ngOnInit(): void {}

    onAdd() {
        this.exResponse.emit(
            new ExcelButtonResponse(
                ExcelControlResponseType.ExcelAdd
            )
        )
    }
    
    onRemove() {
        this.exResponse.emit(
            new ExcelButtonResponse(
                ExcelControlResponseType.ExcelRemove,
                this.exIndex
            )
        )
    }

}