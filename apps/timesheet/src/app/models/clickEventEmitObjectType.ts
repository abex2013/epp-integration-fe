import { ClickEventType } from "./clickEventType";
import { TimeEntry } from "./timesheetModels";

export interface TimeEntryEvent {
    clickEventType: ClickEventType;
    timeEntry: TimeEntry | null;
}

export interface DateColumnEvent {
    clickEventType: ClickEventType;
    totalHours: number;
}