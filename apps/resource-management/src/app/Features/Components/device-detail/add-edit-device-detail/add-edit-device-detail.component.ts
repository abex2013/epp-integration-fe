import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../Models/device-detail/category';
import { DeviceClassification } from '../../../Models/device-detail/deviceclassification';
import { DeviceDetail } from '../../../Models/device-detail/devicedetail';
import { SubCategory } from '../../../Models/device-detail/subcategory';
import { ResponseDTO } from '../../../Models/response-dto.model';
import { CategoryService } from '../../../Services/device-detail/category.service';
import { DeviceClassificationService } from '../../../Services/device-detail/device-classification.service';
import { DeviceDetailService } from '../../../Services/device-detail/device-detail.service';
import { SubcategoryService } from '../../../Services/device-detail/subcategory.service';

@Component({
  selector: 'exec-epp-add-edit-device-detail',
  templateUrl: './add-edit-device-detail.component.html',
  styleUrls: ['./add-edit-device-detail.component.scss']
})
export class AddEditDeviceDetailComponent implements OnInit {
  isWorking!: boolean;
  warranty!: boolean;
  deviceDetailForm!: FormGroup;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  deviceClassifications: DeviceClassification[] = [];
  id!: string | null;
  deviceDetail!: DeviceDetail;
  isEdit!: boolean;
  
  constructor(private fb: FormBuilder, private deviceDetailService: DeviceDetailService,
        private categoryService: CategoryService,
        private subCategoryService: SubcategoryService,
        private deviceClassificationService: DeviceClassificationService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.createDeviceDetailForm();
    this.categoryService.loadCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    if (this.id !== null) {
      this.isEdit = true;
      this.deviceDetailService.getDeviceDetail(this.id).subscribe((response: ResponseDTO<DeviceDetail>) => {
        console.log("the response is  = ", response);
        this.deviceDetail = response.Data;
        this.deviceDetailForm.patchValue(this.deviceDetail);
      });
    } else {
      this.isEdit = false;
    }
    // this.subCategoryService.loadSubCategories().subscribe((subCategories: SubCategory[]) => {
    //   this.subCategories = subCategories;
    // });
    this.deviceClassificationService.loadDeviceClassifications().subscribe((deviceClassifications: DeviceClassification[]) => {
      this.deviceClassifications = deviceClassifications;
    });
  }

  createDeviceDetailForm() {
    this.deviceDetailForm = this.fb.group({
      CategoryGuid: [null, Validators.required],
      SubCategoryGuid: [null, Validators.required],
      CompanyDeviceCode: [null, Validators.required],
      DeviceName: [null, Validators.required],
      BusinessUnit: [null, Validators.required],
      IsWorking: [null, Validators.required],
      AllocateTo: [null],
      DeviceClassificationGuid: [null, Validators.required],
      PurchaseDate: [null, Validators.required],
      Purchaser: [null],
      InvoiceNumber: [null],
      Manufacturer: [null, Validators.required],
      SerialNumber: [null, Validators.required],
      Warranty: [null, Validators.required],
      WarrantyEndDate: [null],
      Notes: [null, Validators.required]
    })
  }

  submitForm() {
    if (this.isEdit) {
      this.updateForm();
    } else {
      this.saveForm();
    }
  }

  saveForm() {
    if (this.deviceDetailForm.valid) {
      this.deviceDetailService.addDeviceDetail(this.deviceDetailForm.value).subscribe((response)=>{
        this.deviceDetailForm.reset();
        this.toastr.success("Successfully Added", "Device Detail")
      });
    } else {
      Object.values(this.deviceDetailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.error("Error", "Form is not valid");
    }
  }

  updateForm() {
    if (this.deviceDetailForm.valid) {
      this.deviceDetailService.updateDeviceDetail(this.deviceDetailForm.value, this.id ?? "")
        .subscribe((response)=>{
          // this.deviceDetailForm.reset();
          this.toastr.success("Successfully Updated", "Device Detail")
        });
    } else {
      Object.values(this.deviceDetailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.error("Error", "Form is not valid");
    }
  }

  onCategoryChange(value: string) {
    this.subCategoryService.getByCategory(value).subscribe((subCategoires: SubCategory[]) => {
      this.subCategories = subCategoires;
    })
  }

  onIsWorkingModelChange(value: string) {
    if(value === "Yes") {
      this.isWorking = true;
    } else {
      this.isWorking = false;
      this.deviceDetailForm.patchValue({AllocateTo: null});
    }
  }

  onWarrantyModelChange(value: string) {
    if (value === "Yes") {
      this.warranty = true;
    } else {
      this.warranty = false;
      this.deviceDetailForm.patchValue({WarrantyEndDate: null});
    }
  }

  resetForm() {
    this.deviceDetailForm.reset();
  }

}
