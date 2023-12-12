import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exec-epp-loacations-form',
  templateUrl: './loacations-form.component.html',
  styleUrls: ['./loacations-form.component.scss']
})
export class LoacationsFormComponent implements OnInit {
  dataSet:any;
  isVisible = false;
  isOkLoading = false;
  footer=null;
  constructor() {
    this.dataSet= [
      {'Country':'Ethiopia','City':"Addis Ababa",'Type':"Billing Address"},
    ]
   }

  ngOnInit(): void {
    console.log();
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
