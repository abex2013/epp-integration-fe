import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DayAndDateService } from '../../services/day-and-date.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  @Input() dates10: any; // decorate the property with @Input()
  @Input() dates11: any; // decorate the property with @Input()
  @Output() valueChange = new EventEmitter();
  @Output() valueChangeNextWeek = new EventEmitter();
  @Output() valueChangeLastWeek = new EventEmitter();

  date = null;
  CounterNextWeek = 0;
  CounterLastWeek = 0;
  constructor(
    private readonly _dayAndDateService: DayAndDateService
    ) { }

  ngOnInit(): void {
  }

  onTodaysButtonClick() {
    const date = this._dayAndDateService.getWeeksFirstDate(new Date())
    this.valueChange.emit(new Date());
  }
  
  onChange(result: Date): void {
    this.valueChange.emit(result);
  }

  valueChangedNextWeek() {
    this.CounterNextWeek = this.CounterNextWeek + 1;
    this.valueChangeNextWeek.emit(this.CounterNextWeek);
  }
  valueChangedLastWeek() {
    this.CounterLastWeek = this.CounterLastWeek + 1;
    this.valueChangeLastWeek.emit(this.CounterLastWeek);
  }
}
