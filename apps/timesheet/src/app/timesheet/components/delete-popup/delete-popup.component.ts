import {Input, Output} from "@angular/core";
import {TimeEntry} from "../../../models/timesheetModels";


export class DeletePopupComponent {
  @Output() moreTimeEntry: TimeEntry | null = null;
  isVisible = false;
  popoverVisible = false;
  constructor() {
  }
  showModal(): void {
    this.isVisible = true;
  }
  closePopover() {
    this.popoverVisible = false;
  }
  showDeleteConfirm(): void {
    // @ts-ignore
    this.modal.confirm({


      // cursor: 'pointer',
      // background: '#FFFFFF',
      nzTitle: 'Delete?',
      nzContent: '<b style="color: #262626; background: #FFFFFF;border: #00A551; height: 194px;radius: 2px;padding: 24px;">Are you sure you want to delete this entry?<br> you can\'t undo this action.</b>',
      nzOkText: '<b style="color: #262626; ">Yes, Delete</b>',
      nzOkType: 'primary',


      // border: '#00A551',
      // radius: '2px',
      // top: '357px',
      // width: '328px',
      // padding: '24px',
      // left: '532px',
      nzOkDanger: true,
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
      nzOnOk: () => console.log('OK'),

    });
  }
}
