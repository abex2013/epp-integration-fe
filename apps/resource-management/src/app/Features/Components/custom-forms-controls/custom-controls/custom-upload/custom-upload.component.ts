import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
@Component({
    selector: 'exec-epp-custom-upload',
    templateUrl: './custom-upload.component.html',
    styleUrls: ['./custom-upload.component.scss']
  })
export class CustomUploadComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    
    fileList: NzUploadFile[] = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: '../../../../../../assets/images/profile-pic-placeholder.png'
      }
    ];
    previewImage: string | undefined = '';
    previewVisible = false;
    errMessage = ''

    constructor() {
    }

    ngOnInit(): void {
    }

    handlePreview = async (file: NzUploadFile): Promise<void> => {
      // alert("yes");
      // if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file.originFileObj!);
      // }
      // this.previewImage = file.url || file.preview;
      // this.previewVisible = true;
    };

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}