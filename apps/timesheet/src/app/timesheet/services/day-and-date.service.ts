import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DaydateModel} from "../../models/daydate.model";

@Injectable({
  providedIn: 'root'
})
export class DayAndDateService {
  date = new Date();
  public weekDays: DaydateModel[] = [];
  firstday: any;
  lastday: any;
  firstday1: any;
  lastday1: any;

  constructor(private http: HttpClient) {
  }

  //Returns Monday's date for the week
  //Assumming Monday is the first date and Sunday is the last date
  getWeeksFirstDate(date: Date){
    let firstDate;

    if (date.getDay() === 0){
      firstDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    }
    else{
      date.setDate(date.getDate() - date.getDay() + 1);
      firstDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    return firstDate;
  }

  //Returns Sunday's date for the week
  //Assumming Monday is the first date and Sunday is the last date
  getWeeksLastDate(date: Date){
    let lastDate;

    if(date.getDay() === 0){
      lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    else{
      date.setDate(date.getDate() - date.getDay() + 1);
      lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);
    }
  }

  getRangeOfDates(fromDate: Date, toDate: Date) {
    let dates = [];
    let startDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    let endDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    while (startDate <= endDate) {
      dates.push(startDate);
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
    }
    return dates;
  }

  nextWeekDates(cuur1: any, increamt: any): any[] {
    this.clearData();
    this.computeFirstDay(cuur1);
    for (let i = 0; i <= 8; i++) {
      if (this.weekDays.length === 7) {
        break
      } else {
        if (i === 0) {
          continue;
        } else {
          this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
          let bb: DaydateModel;
          // eslint-disable-next-line prefer-const
          bb = this.lastday;
          this.weekDays.push(bb);
          this.lastday1 = bb;
        }
      }
    }
    return this.weekDays;
  }

  lastWeekDates(cuur1: any, decreament: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDayForPreviosWeek(cuur1);
      for (let i = 0; i >= -8; i--) {
        if (this.weekDays.length === 7) {
          break
        } else {
          if (i === 0) {
            continue;
          } else {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - i));
            let bb: DaydateModel;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          }
        }
      }
    }
    return this.weekDays;
  }

  getWeekendLastDay(): any {
    return this.lastday1;
  }

  getWeekendFirstDay(): any {
    return this.firstday1;
  }

  clearData() {
    this.weekDays = [];
    this.lastday = '';
    this.firstday = '';
    this.lastday1 = '';
  }

  getWeekByDate(cuur1: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDay(cuur1);
      for (let i = 0; i <= 8; i++) {
        if (this.weekDays.length === 7) {
          break
        } else {
          if (i === 0) {
            continue;
          } else {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
            let bb: DaydateModel;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          }
        }
      }
    }
    return this.weekDays;
  }

  computeFirstDayForPreviosWeek(cuur1: any) {
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - 6));
  }

  computeFirstDay(cuur1: any) {
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
  }
}
