export const clientContacts=[
        {
          name: "Hussen Seid",
          role: "PO",
          phone: "0912891914" ,
         email:"hseid@excellerentsolutions.com"
          },
        {
          name: "Yasechalew Erekun",
          role: "Senior Dev",
          phone: "094989289829" ,
         email:"Yaschalew@excellerentsolutions.com"
          },
        {
          name: "Joseph Assefa",
          role: "Dev III",
          phone: "0945948911" ,
         email:"Yoseph@excellerentsolutions.com"
          },
        {
          name: "Amanule Zewdeu",
          role: "Dev III",
          phone: "099882928911" ,
         email:"Amanuel@excellerentsolutions.com"
          },
         {
          name: "Meskerm Arega",
          role: "PM",
          phone: "0949893892" ,
         email:"Meskerm@excellerentsolutions.com"
          },
          {
          name: "Isayas Tadesse",
          role: "Dev III",
          phone: "0903978982" ,
         email:"Isayas@excellerentsolutions.com"
          },
         {
          name: "Yoseph Kefale ",
          role: "Dev III",
          phone: "0903978982" ,
         email:"Yosef@excellerentsolutions.com"
          },
        {
          name: "Sewnet Abebaw ",
          role: "Dev III",
          phone: "0903978982" ,
         email:"Sewnet@excellerentsolutions.com"
          },
        {
          name: "Abebaw Tefera ",
          role: "Dev III",
          phone: "0903978982" ,
         email:"Abebaw@excellerentsolutions.com"
          },


]


export function getNames()
{
    return clientContacts.map(
        (clientContact:any)=>{
            return {
                name:clientContact.name,
                role:clientContact.role,
                email:clientContact.email,
                phone:clientContact.phone

            };
        }
    )

}

export function getClientDetails(name:string)
{
    for (let i = 0; i < clientContacts.length; i++) {
       if(clientContacts[i].name===name){
           return clientContacts[i];
       }
    }
    return clientContacts[1];



}
