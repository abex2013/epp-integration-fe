export interface Employee {
  id: string;
  name: string;
  postion: EmployeePostion;
}

export enum EmployeePostion {
  TDM = 'Tecnical Delivary Manager',
  Dev3 = 'Devloper 3',
  seniorDev1 = 'Senior Devloper 1',
  seniorDev2 = 'Senior Devloper 2',
  seniorDev3 = 'Senior Devloper 3',
  PO="Product Owner", 
  SM="scrum master",
  RD="React Devloper",
  UID="UI Devloper"
}
