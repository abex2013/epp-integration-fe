import { Employee } from ".";



export interface CompanyContact{
  employee:Employee;
}


export interface CompanyContact{
  Employee:Employee;

  EmployeeGuid: string;
  Guid: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: Date;
  CreatedbyUserGuid: string;

}

