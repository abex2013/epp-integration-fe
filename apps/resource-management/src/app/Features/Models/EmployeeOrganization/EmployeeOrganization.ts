import{ICountry} from '../../Models/EmployeeOrganization/Country'

export interface EmployeeOrganization {
    Country: string;
    DutyStation: string;
    DutyBranch: string;
    CompaynEmail: string;
    PhoneNumber: string;
    JoiningDate: Date;
    TerminationDate: Date;
    EmploymentType: string;
    Department: string;
    BusinessUnit:string;
    ReportingManager: string;
    JobTitle: string;
    Status: string;
}
