import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetail } from '../../Models/device-detail/devicedetail';
import { Pagination } from '../../Models/device-detail/pagination';
import { DeviceDetailService } from '../../Services/device-detail/device-detail.service';

@Component({
  selector: 'exec-epp-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  listOfDeviceDetails: DeviceDetail[] = [];
  pagination!: Pagination;
  constructor(private deviceDetailService: DeviceDetailService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceDetails();
  }

  getDeviceDetails() {
    this.deviceDetailService.getDeviceDetails(1).subscribe((response)=>{
      this.pagination = response;
      this.listOfDeviceDetails=response.Data;
    });
  }

  pageIndexChange(index: number) {
    this.deviceDetailService.getDeviceDetails(index).subscribe((response)=>{
      this.pagination = response;
      this.listOfDeviceDetails=response.Data;
    });
  }

  deleteHandler(id: string) {
    this.deviceDetailService.deleteDeviceDetail(id).subscribe((response) => {
      this.toastrService.success(response.message, "Device Detail");
      this.listOfDeviceDetails = this.listOfDeviceDetails.filter((d) => d.Guid !== id);
    })
  }
}
