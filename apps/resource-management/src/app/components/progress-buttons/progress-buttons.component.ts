import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-progress-buttons',
  templateUrl: './progress-buttons.component.html',
  styleUrls: ['./progress-buttons.component.scss']
})
export class ProgressButtonsComponent implements OnInit {

  // It is the parameter that will decide the buttons that are visisble
  // true: all three buttons will appears
  // false: only back and next appears
  @Input() isMultiple = false

  // It will emit a string notifying the type of button clicked
  @Output() actionType: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.actionType.emit('submit')
  }

  onNext(){
    this.actionType.emit('next')
  }

  onBack(){
    this.actionType.emit('back')
  }

}
