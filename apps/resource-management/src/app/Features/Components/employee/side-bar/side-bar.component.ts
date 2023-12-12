import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exec-epp-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {

  @Input() active = 0
  constructor() {}
  title = 'client';

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
