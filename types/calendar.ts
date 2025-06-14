export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

export interface CalendarDay {
  persianDate: PersianDate;
  gregorianDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: string[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  year: number;
  month: number;
  weeks: CalendarWeek[];
}

export interface NavigationState {
  year: number;
  month: number;
}
