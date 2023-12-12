import { Injectable } from "@angular/core";
import { employeeIdNumberSeparator } from "./basic-data.collection";

@Injectable({
    providedIn: 'root'
})
export class DataExtractorService {

    constructor() {}

    extractEmployeeNumber(value: string) {
        const segments = value.split(employeeIdNumberSeparator)
        if(segments.length !== 3) {
            throw new Error("Employee ID number is not valid!");
        }
        return {
            prefix: segments[0],
            value: segments[1],
            suffix: segments[2]
        }
    }

    extractPhoneNumber(value: string, listofPrefices: string[]) {
        let noofMatches = 0
        for (let i = 0; i < listofPrefices.length; i++) {
            if(value.indexOf(listofPrefices[i]) === 0
            && listofPrefices[i].length > noofMatches) {
                noofMatches = listofPrefices[i].length
            }
        }
        if(noofMatches === 0) {
            throw new Error("Phone number is not valid!");
        }
        return {
            prefix: value.substring(0, noofMatches),
            value: value.substring(noofMatches),
            suffix: null
        }
    }

}