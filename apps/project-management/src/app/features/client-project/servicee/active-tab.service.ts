import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveTabService {
  private isClientTabActiveSorce=new BehaviorSubject<number>(0);
  isClientTabActiv$=this.isClientTabActiveSorce.asObservable();
   getActivePage()
{   
  return this.isClientTabActiveSorce.value;
}

setFristPage(data:number)
{
  this.isClientTabActiveSorce.next(data);
  
}

}
