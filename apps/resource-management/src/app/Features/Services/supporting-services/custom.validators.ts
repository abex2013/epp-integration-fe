import { AbstractControl } from "@angular/forms";
import { ValidatorResponse } from "../../Models/supporting-models/validator-response.model";
import { employeeIdNumberSeparator, maxEmployeeDateofBirth, maxNumberofCharactersinEmail, maxNumberofCharactersinName, maxNumberofEmployeeIdNumberPart1, maxNumberofPeriodinEmailSegmentafterAt, minEmployeeDateofBirth, minNumberofCharactersinEmailSegment, minNumberofCharactersinName, minNumberofEmployeeIdNumberPart1, minNumberofPeriodinEmailSegmentafterAt, nearestEmployeeDateofBirth, numberofEmployeeIdNumberPart2 } from "./basic-data.collection";


export const commonErrorMessage = {
    required: true,
    message: ''
} as ValidatorResponse


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Validators
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

export function validateRequired(control: AbstractControl) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Employee ID number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        }
    )
}

export function validateEmployeeIdNumber(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Employee ID number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkLength,
            parameters: modifyParameters(parameters, { min: 1, max: 10 })
        },
        {
            method: checkEmployeeIdNumberCharacter,
            parameters: parameters
        }
    )
}

export function validateFirstName(
    control: AbstractControl
) {
    resetError(true)
    return validateName(control, commonErrorMessage, 'First name')
}

export function validateMiddleName(
    control: AbstractControl
) {

    resetError(true)
    if (!control.value) {
        return null
    }
    return validateName(control, commonErrorMessage, 'Middle name')
}

export function validateLastName(
    control: AbstractControl
) {
    resetError(true)
    return validateName(control, commonErrorMessage, 'Last name')
}

export function validateName(
    control: AbstractControl,
    errorLog: ValidatorResponse,
    kind: string
) {
    const parameters = [control, errorLog, null, kind]
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkLetter,
            parameters: parameters
        },
        {
            method: checkLength,
            parameters: modifyParameters(
                parameters,
                {
                    min: 2,
                    max: 25
                })
        }
    )
}

export function validateGender(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Employee ID number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        }
    )
}

export function validateEmployeeDateofBirth(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Employee\'s date of birth']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkDateRange,
            parameters: modifyParameters(
                parameters,
                {
                    min: minEmployeeDateofBirth,
                    max: maxEmployeeDateofBirth
                }
            )
        }
    )

}

export function validateEmailAddress(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Email address']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkLength,
            parameters: modifyParameters(
                parameters,
                { min: 1, max: 255 }
            )
        },
        {
            method: checkEmailCharacters,
            parameters: parameters
        }
    )
}

export function validatePhoneNumber(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Phone Number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkPhoneNumberCharacters,
            parameters: parameters
        },
        {
            method: checkLength,
            parameters: modifyParameters(parameters, { min: 9, max: 15 })
        }
    )
}

export function validateNationality(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'Phone Number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        }
    )
}

export function validateAddressRequired(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'City']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkAddresses,
            parameters: parameters
        }
    )
}

export function validateAddressNonRequired(
    control: AbstractControl
) {
    if (!control.value) {
        return null
    }
    resetError(false)
    const parameters = [control, commonErrorMessage, null, 'City']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkAddresses,
            parameters: parameters
        }
    )
}

export function validateCity(
    control: AbstractControl
) {
    resetError(true)
    const parameters = [control, commonErrorMessage, null, 'City']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkCity,
            parameters: parameters
        },
        {
            method: checkLength,
            parameters: modifyParameters(parameters, { min: 2, max: 30 })
        }
    )
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Checking Functions
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function checkMultiple(
    ...methods: Argument[]
) {
    for (let i = 0; i < methods.length; i++) {
        const result = methods[i].method(
            methods[i].parameters[0],
            methods[i].parameters[1],
            methods[i].parameters[2],
            methods[i].parameters[3]
        )
        if (result !== null) {
            return result
        } else {
            const strValue: string = methods[i].parameters[0]
            if (!methods[i].parameters[0]) {
                return null
            }
        }
    }
    return null
}

function checkrequired(
    control: AbstractControl,
    errorLog: { message: string },
    condition: null,
    controlName?: string
) {
    if (!control.value) {
        errorLog.message = 'Input is required! Please provide a valid input.'
        return { required: true }
    }
    return null
}

function checkLength(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (condition.min) {
        if (control.value.length < condition.min) {
            errorLog.message
                = 'Input should contain a minimum of ' + condition.min + ' characters!'
            return { minLength: true }
        }
    }
    if (condition.max) {
        if (control.value.length > condition.max) {
            errorLog.message
                = 'Input can contain a maximum of ' + condition.max + ' characters!'
            return { maxLength: true }
        }
    }
    return null
}

function checkFromList(
    control: AbstractControl,
    errorLog: { message: string },
    condition: any[],
    controlName: string
) {
    if (condition.indexOf(control.value) >= 0) {
        errorLog.message = 'Invalid employee ID prefix!'
        return { invalid: true }
    }
    return null;
}

function checkLetter(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[A-Za-z]+$/).test(control.value)) {
        errorLog.message = 'Input contains invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkNumerals(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[0-9]+$/).test(control.value)) {
        errorLog.message = 'Input contains invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkAddresses(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[A-Za-z. /0-9]+$/).test(control.value)) {
        errorLog.message = 'Input contains invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkCity(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[A-Za-z. /]+$/).test(control.value)) {
        errorLog.message = 'Input contains invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkDateRange(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: Date, max?: Date },
    controlName: string
) {
    if (condition.min) {
        if (control.value < condition.min) {
            errorLog.message = 'Input shouldn\'t be before ' + condition.min.toISOString() + '!'
            return { timeBefore: true }
        }
    }
    if (condition.max) {
        if (control.value > condition.max) {
            errorLog.message = 'Input shouldn\'t be after ' + condition.max.toISOString() + '!'
            return { timeAfter: true }
        }
    }
    return null
}

function checkEmployeeIdNumberCharacter(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[A-Za-z0-9/]+$/).test(control.value)) {
        errorLog.message = 'Input contains invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkEmployeeIdNumberLayout(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    const strValue: string = control.value
    const segments = strValue.split(employeeIdNumberSeparator)
    let result: any
    if (segments.length === 2) {
        if (segments[1].length !== numberofEmployeeIdNumberPart2) {
            errorLog.message = numberofEmployeeIdNumberPart2 + ' digits must be supplied after \'/\'!'
            return { invalidFormat: true }
        } else {
            return null
        }
    } else if (segments.length === 1) {
        if (segments[0].length < minNumberofEmployeeIdNumberPart1) {
            errorLog.message = 'A minimum of ' + minNumberofEmployeeIdNumberPart1 + ' digit(s) must be supplied before \'/\'!'
            return { invalidFormat: true }
        } else if (segments[0].length < maxNumberofEmployeeIdNumberPart1) {
            errorLog.message = 'A maximum of ' + maxNumberofEmployeeIdNumberPart1 + ' digits could be supplied before \'/\'!'
            return { invalidFormat: true }
        } else {
            errorLog.message = 'Incomplete, please finish the entry as \'12345/21\'!'
            return { incompleteFormat: true }
        }
    }
    return null
}

function checkEmailCharacters(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(RegExp("^([A-Za-z0-9._%+-]?)+[A-Za-z]+([A-Za-z0-9._%+-]?)+@([a-z0-9.-]?)+[A-Za-z]+([a-z0-9.-]?)+\\.[A-Za-z]{2,4}$").test(control.value))) {
        errorLog.message = 'Please provide a valid input!'
        return { invalidCharacter: true }
    }
    return null
}

function checkPhoneNumberCharacters(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!((/^(?:\d{3}|\(\d{3}\))([- \/\.])\d{3,4}\1\d{4}$/).test(control.value) || (/^\d{9,10}$/).test(control.value))) {
        errorLog.message = 'Please provide a valid input!'
        return { invalidCharacter: true }
    }
    return null
}


function checkEmailLayout(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    let i = 0
    let segments: string[] = [control.value]
    let result = checkCharSeparatedSegment(segments[i], '@', 1, 1, minNumberofCharactersinEmailSegment, maxNumberofCharactersinEmail, errorLog)
    if (result.type === 'minbn') {
        return { minLength: true }
    } else if (result.type === 'maxbn') {
        return { maxLength: true }
    } else if (result.type === 'maxchar') {
        return { minChar: true }
    } else if (result.type === 'minchar') {
        return { maxChar: true }
    }

    segments = segments[0].split('@')
    result = checkCharSeparatedSegment(segments[0], '.', 0, 10, minNumberofCharactersinEmailSegment, maxNumberofCharactersinEmail, errorLog)
    if (result.type === 'minbn') {
        return { minLength: true }
    } else if (result.type === 'maxbn') {
        return { maxLength: true }
    } else if (result.type === 'maxchar') {
        return { minChar: true }
    } else if (result.type === 'minchar') {
        return { maxChar: true }
    }
    result = checkCharSeparatedSegment(segments[0], '.', 1, 2, minNumberofCharactersinEmailSegment, maxNumberofCharactersinEmail, errorLog)
    if (result.type === 'minbn') {
        return { minLength: true }
    } else if (result.type === 'maxbn') {
        return { maxLength: true }
    } else if (result.type === 'maxchar') {
        return { minChar: true }
    } else if (result.type === 'minchar') {
        return { maxChar: true }
    }
    return null
}

function checkCharSeparatedSegment(
    value: string,
    char: string,
    minAmount: number,
    maxAmount: number,
    minAmountbetween: number,
    maxAmountbetween: number,
    errorLog: { message: string }
) {
    let valueIn = value.substring(0)
    let countChar = 0
    let result: any = { type: '' }
    while (true) {

        const position = valueIn.indexOf(char) < 0 ? valueIn.length : valueIn.indexOf(char)
        if (position < minAmountbetween || (position > valueIn.length - minAmountbetween && position < valueIn.length)) {
            errorLog.message = 'Input should contain a minimum of ' + minAmountbetween + ' characters before/after \'' + char + '\'!'
            return { type: 'minbn' }
        } else if (position > maxAmountbetween) {
            errorLog.message = 'Input should contain a maximum of ' + maxAmountbetween + ' characters before/after \'' + char + '\'!'
            return { type: 'maxbn' }
        }

        if (position === valueIn.length) {
            break
        } else {
            valueIn = valueIn.substring(position + 1)
            countChar += 1
            if (countChar > maxAmount) {
                errorLog.message = 'Input should contain a maximum of ' + maxAmount + ' \'' + char + '\'(s)!'
                return { type: 'maxchar' }
            }
        }
    }
    if (countChar < minAmount) {
        errorLog.message = 'Input should contain a minimum of ' + minAmount + ' \'' + char + '\'(s)!'
        return { type: 'minchar' }
    } else {
        return { type: '' }
    }
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Supporting Functions
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function capitalizeFirstLetterOnly(value: string) {
    return value[0].toLocaleUpperCase() + value.substring(1)
}

function modifyParameters(params: any[], condition: any) {
    return [
        params[0],
        params[1],
        condition,
        params[3]
    ]
}

export function resetError(required = true) {
    commonErrorMessage.message = ''
    if (required) {
        commonErrorMessage.required = true
    } else {
        commonErrorMessage.required = false
    }
    commonErrorMessage.message = ''
}

type Argument = {
    method: any,
    parameters: any[]
}