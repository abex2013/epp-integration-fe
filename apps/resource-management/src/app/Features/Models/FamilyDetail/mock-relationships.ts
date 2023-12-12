import { Relationship } from "./RelationshipModel"

export const Relationships:Relationship[]=[
  {
    Name: "Spouse",
    Guid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7",
    IsActive: false,
    IsDeleted: false,
    CreatedDate: "2021-11-21T10:01:35.222Z",
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7"
  },
  {
    Name: "Father",
    Guid: "3fa85f64-5717-4562-b3fc-2c963f6bafa6",
    IsActive: false,
    IsDeleted: false,
    CreatedDate: Date.now.toString(),
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7"
  },
  {
    Name: "Mother",
    Guid: "3fa85f64-5717-4562-b3fc-2c963f6bafa8",
    IsActive: true,
    IsDeleted: false,
    CreatedDate: "2011-08-08T00:00:00",
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7"
  },
  {
    Name: "Child",
    Guid: "3fa85f64-5717-4562-b3fc-2c963f6bafa9",
    IsActive: true,
    IsDeleted: false,
    CreatedDate: "2011-08-08T00:00:00",
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7"
  },
  {
    Name: "Other",
    Guid: "3fa85f64-5717-4562-b3fc-2c963f6baf10",
    IsActive: false,
    IsDeleted: false,
    CreatedDate: "2011-08-08T00:00:00",
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f6bafa7"
  }
]
