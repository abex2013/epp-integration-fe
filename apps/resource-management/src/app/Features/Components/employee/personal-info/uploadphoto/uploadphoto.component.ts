import { Component } from '@angular/core';
import { EmpphotoService } from '../../../Services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'exec-epp-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.scss']
})
export class UploadphotoComponent {

  fileName = "";
   formData: FormData = new FormData();
   imageUrl="assets/Ellipse.png";
   
   afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};

  constructor(private uploadphoto: EmpphotoService) { }



  onFileSelected(event : any) {

    if(event.targer.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.targer.files[0]);
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
      }
    }

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        this.formData.append("thumbnail", file,file.name);

        console.log(this.formData);
        console.log(file);



    }

}

submit(){
  this.uploadphoto.uploadEmployeePhoto(this.formData);
  alert("photo uploaded");
}



}
