import { FormControlName } from "@angular/forms";
import { FormControlType } from "./form-control-name-type.enum";

export type FormControlResponseModel = {
    type: FormControlType
    name: FormControlName
    index?: number
}