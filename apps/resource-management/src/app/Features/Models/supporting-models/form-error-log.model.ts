import { FormControl } from "@angular/forms"

export enum ErrorStates {
    validating,
    success,
    warning,
    error
}

function getErrorState(errState: ErrorStates) {
    if (errState === ErrorStates.validating) {
        return 'validating'
    } else if (errState === ErrorStates.success) {
        return 'success'
    } else if (errState === ErrorStates.warning) {
        return 'warning'
    } else {
        return 'error'
    }
}

export abstract class UIParameters {

    constructor(
        public readonly nzSm: number,
        public readonly nzXs: number
    ) {

    }
}

export abstract class FormInputParameter {

}

export abstract class BaseFormControlParameter {

    constructor(
        public readonly nzSm: number,
        public readonly nzXs: number
    ) { }
}

export class FormControlParameter extends BaseFormControlParameter {

    constructor(
        nzSm: number,
        nzXs: number
    ) { 
        super(nzSm, nzXs)
    }
}

export class FormLabelParameter extends BaseFormControlParameter {

    constructor(
        nzSm: number,
        nzXs: number
    ) { 
        super(nzSm, nzXs)
    }
}

export class FormItemlParameter extends BaseFormControlParameter {

    constructor(
        nzSm: number,
        nzXs: number
    ) { 
        super(nzSm, nzXs)
    }
}

export class FormInputData {

    private _container: FormControlData | null = null
    private _message = ''
    private _validationState: ErrorStates = ErrorStates.validating
    private _value: any

    constructor(
        private _name: string,
        private _required: boolean
    ) { }

    public get Name(): string {
        return this._name.substring(0)
    }

    public get State(): string {
        return getErrorState(this._validationState)
    }

    public get ErrorState(): ErrorStates {
        return this._validationState
    }

    public get Message(): string {
        return this._message.substring(0)
    }

    public get Required(): boolean {
        return this._required
    }

    public set Required(value: boolean) {
        this._required = value
    }

    public get Value(): any {
        return this._value
    }

    setContainer(container: FormControlData) {
        if(this._container !== null) {
            throw new Error("");
        }
        this._container = container
    }

    setState(required?: boolean, newState?: ErrorStates, message?: string, value?: any) {
        this._required = required ? required : this._required
        this._validationState = newState? newState: this._validationState
        this._message = message ? message : this._message
        this._value = value ? value : this._value
        if(this._container !== null) {
            this._container.recalculate()
        }
    }

}

export class FormControlData {

    required = false
    state = 'validating'
    message = ''
    value: any
    private readonly _formInputs: FormInputData[]

    constructor(
        public readonly name: string,
        private _integrationFunction: ((...any: any[]) => any),
        public readonly config: FormControlParameter,
        public readonly control: FormControl,
        ...formInputs: FormInputData[]
    ) {
        formInputs.forEach(formInput=>formInput.setContainer(this))
        this._formInputs = formInputs
    }

    public recalculate() {
        let index = 0
        let state = ErrorStates.validating
        this.required = false
        for (let i = 0; i < this._formInputs.length; i++) {
            this.required ||= this._formInputs[i].Required
            if (state <= this._formInputs[i].ErrorState) {
                state = this._formInputs[i].ErrorState
                index = i
            }
        }
        this.state = getErrorState(state)
        this.message = this._formInputs[index].Message
        this.value = this._integrationFunction(...this._formInputs.map(each => each.Value))
    }

}

export class FormLabelData {

    constructor(
        public readonly label: string,
        private _formControl: FormControlData,
        public readonly config: FormLabelParameter
    ) { }

    public get ControlName(): string {
        return this._formControl.name
    }

}

export class FormItemData {
    constructor(
        public readonly name: string,
        public readonly formLabel: FormLabelData,
        public readonly formControl: FormControlData,
        public readonly config: FormItemlParameter
    ) { }

}


///////////////////////////////////////////////////

export const defaultTextBox = new FormInputData('Input', true)

export const defaultFormLabellParameter = new FormLabelParameter(6, 24)
export const defaultFormControlParameter = new FormControlParameter(14, 24)
export const defaultFormItemParameter = new FormItemlParameter(14, 24)

export const defaultFormControlData = new FormControlData(
    'Control',
    ((formInput: any) => formInput),
    defaultFormControlParameter,
    new FormControl(),
    defaultTextBox
)
export const defaultFormLabellData = new FormLabelData(
    'Label', defaultFormControlData, defaultFormLabellParameter
)

export const defaultFormItemData = new FormItemData(
    'Label', defaultFormLabellData, defaultFormControlData, defaultFormItemParameter
)
