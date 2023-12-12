import { Relationship } from "./RelationshipModel";

export interface FamilyDetail{
  Guid: string
  EmployeeId:string
  RelationshipId: string
  Remark: string
  FullName: string
  Gender: string
  DateofBirth: string
  IsActive: true
  IsDeleted: false
  CreatedDate: string
  Relationship?:Relationship
  CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
