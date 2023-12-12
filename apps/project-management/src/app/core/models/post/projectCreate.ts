import { projectResourceType } from ".";

export interface ProjectCreate {
  ProjectName: string;
  ProjectStatusGuid: string;
  ProjectType:string;
  SupervisorGuid:string;
  StartDate: Date;
  EndDate: string;
  ClientGuid :string;
  AssignResource?: projectResourceType[];
  Description?:string
}














