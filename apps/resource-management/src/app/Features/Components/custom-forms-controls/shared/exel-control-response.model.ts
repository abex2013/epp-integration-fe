/* eslint-disable @typescript-eslint/no-empty-function */
import { ExcelControlResponseType } from "./excel-control-response-type.enum";
import { ExcelControlType } from "./excel-control-type.enum";

export class ExcelControlResponse {

    constructor(
        public readonly type: ExcelControlType,
        public readonly action: ExcelControlResponseType,
        public readonly data?: any
    ) { }
}

export class ExcelButtonResponse extends ExcelControlResponse {
    constructor(
        action: ExcelControlResponseType,
        data?: any
    ) {
        super(
            ExcelControlType.ExcelButton,
            action,
            data
        )
    }
}

export class ExcelTextBoxResponse extends ExcelControlResponse {
    constructor(
        data?: any
    ) {
        super(
            ExcelControlType.ExcelButton,
            ExcelControlResponseType.ExcelValueChange,
            data
        )
    }
}

export class ExcelSelectControlResponse extends ExcelControlResponse {
    constructor(
        data?: any
    ) {
        super(
            ExcelControlType.ExcelButton,
            ExcelControlResponseType.ExcelSelect,
            data
        )
    }
}