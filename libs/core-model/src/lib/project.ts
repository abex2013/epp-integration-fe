import { Employee, ProjectResourceRequirement } from '..';
import { Client } from './client';
import { EmployeePostion } from './employee';

export interface Project {
  id: string;
  name: string;
  status: projectStatus;
  type: projectType;
  startDate: Date;
  client?: Client;
  endDate?: Date;
  createdDate?:Date;
  supervisor:Employee;
  projectResourceRequirement?:ProjectResourceRequirement[];
  assignedEmployee?:ProjectResource[]
}



export enum projectStatus {
  active="Active",
  inactive="InActive",
  signed="Signed",
  closed="closed",
}

export enum projectType {
  internal="Internal",
  external="External",
}

export enum ResourceType{
 Client="Client",
 Project="Project"
}

export interface ProjectResource{
    employee:Employee,
    assignedDate:Date;
    assignedTo:ResourceType;
}
