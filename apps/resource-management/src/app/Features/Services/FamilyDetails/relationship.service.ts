import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FamilyDetail } from '../../Models/FamilyDetail/FamilyDetailModel';
import { FamilyDetails } from '../../Models/FamilyDetail/mock-family-details';
import { Relationships } from '../../Models/FamilyDetail/mock-relationships';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  relIds:string[]=[];
  father_registered=false;
  mother_registered=false;
  constructor( private readonly _httpClient: HttpClient
    ) {}
  getListofRelationships(maritalstatus: string){
  /*  const rels:FamilyDetail[]=FamilyDetails.filter(r=>r.EmployeeId===empId);

    for(let i=0;i<rels[0].RelationshipId.length;i++)
    {
     this.relIds.push (rels[0].RelationshipId[i]);
    }
   if(maritalstatus=="Not Married" && this.isFatherRegistered() &&  this.isMotherRegistered())
    return of(Relationships.filter(rel=>rel.Name!=="Spouse" && rel.Name!=="Father" && rel.Name!=="Mother"));
  else if (maritalstatus=="Married" && this.isFatherRegistered() &&  this.isMotherRegistered())
  {
    return of(Relationships.filter(rel=>rel.Name!=="Father" && rel.Name!=="Mother"));
  }
  else if (maritalstatus=="Married" && !this.isFatherRegistered() &&  this.isMotherRegistered())
  {
    return of(Relationships.filter(rel=> rel.Name!=="Mother"));
  }
  else if (maritalstatus=="Married" && this.isFatherRegistered() &&  !this.isMotherRegistered())
  {
    return of(Relationships.filter(rel=>rel.Name!=="Father"));
  }
  else if (maritalstatus=="Not Married" && !this.isFatherRegistered() &&  this.isMotherRegistered())
  {
    return of(Relationships.filter(rel=>rel.Name!=="Spouse" && rel.Name!=="Mother"));
  }
  else if (maritalstatus=="Not Married" && this.isFatherRegistered() &&  !this.isMotherRegistered())
  {
    return of(Relationships.filter(rel=>rel.Name!=="Spouse" && rel.Name!=="Father"));
  }*/
  if (maritalstatus=="Not Married")
  {
    return of(Relationships.filter(rel=>rel.Name!=="Spouse"));
  }
  else{
    return of(Relationships);
  }
  }
  isFatherRegistered():boolean{

    for (let i=0;i<this.relIds.length; i++)
    {
      const res =Relationships.filter(r=>r.Guid===this.relIds[i] && r.Name=="Father");
      if(res.length>0)
      {
        this.father_registered=true;
      }
    }
    return this.father_registered;
  }
  isMotherRegistered():boolean{

    for (let i=0;i<this.relIds.length; i++)
    {
      const res =Relationships.filter(r=>r.Guid===this.relIds[i]  && r.Name=="Mother");
      if(res.length>0)
      {
        this.mother_registered=true;
      }
    }
    return this.mother_registered;
  }
}
