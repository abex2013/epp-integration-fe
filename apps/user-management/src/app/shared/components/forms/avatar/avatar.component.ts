import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() icon: any;
  @Input() size: any;
  @Input() url = '';
  @Input() text = '';
  @Input() shape:any;
  constructor() {}

  ngOnInit(): void {}

}
