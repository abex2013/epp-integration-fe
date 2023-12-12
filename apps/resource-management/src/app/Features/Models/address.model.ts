export interface Address{
    Guid: string
    Country: string
    StateRegionProvice: string
    City: string
    SubCityZone: string
    Woreda: string
    HouseNumber: string
    PostalCode: string
    PhoneNumber: string
    IsActive: true
    IsDeleted: false
    CreatedDate: Date
    CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
export class Addresss implements Address {
    constructor(
        public Guid: string,
        public Country: string,
        public StateRegionProvice: string,
        public City: string,
        public SubCityZone: string,
        public Woreda: string,
        public HouseNumber: string,
        public PostalCode: string,
        public PhoneNumber: string,
        public IsActive: true,
        public IsDeleted: false,
        public CreatedDate: Date,
        public CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  
    ){}
    
  }
  