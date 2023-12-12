import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() acceptedFiles : string = '';
  @Input() beforeUpload : any;
  @Input() action : any;
  @Input() file : any;
  @Input() fileList :any;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }
  onChangeEvent(e:any){
    this.onChange.emit(e);
  }

}
