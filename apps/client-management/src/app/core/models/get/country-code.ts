export interface CountryCode{
 error:boolean;
 msg:string;
 data:Data[];
}

export interface Data{
  name:string;
  code:string;
  dial_code:string;

}
