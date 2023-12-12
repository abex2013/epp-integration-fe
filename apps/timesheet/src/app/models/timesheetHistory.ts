export interface TimesheetHistory{
    timesheetApprovalId:string ;
    startDate:Date;
    endDate:Date;
    projectName:string;
    clientName:string;
    status:string;
    managerNote?:string;
}

