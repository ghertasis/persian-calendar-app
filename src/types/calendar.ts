// تایپ برای ماه‌های شمسی
export type PersianMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// تایپ برای تاریخ شمسی
export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

// تایپ برای ماه تقویم (اضافه شده)
export interface CalendarMonth {
  year: number;
  month: number;
  days: Array<{
    day: number;
    isCurrentMonth: boolean;
    date: PersianDate;
  }>;
}

// تایپ برای وضعیت ناوبری (اضافه شده)
export interface NavigationState {
  currentDate: PersianDate;
  selectedDate?: PersianDate;
}

// تایپ برای رویداد
export interface EventType {
  id: string;
  title: string;
  description?: string;
  date: PersianDate;
  type: 'holiday' | 'event' | 'reminder';
  isHoliday?: boolean;
  color?: string;
}

// تایپ برای نوع رویداد (تغییر نام از EventCategory)
export interface EventCategory {
  id: string;
  name: string; // تغییر از title به name
  color: string;
  isHoliday: boolean;
}

// نام مستعار برای سازگاری (اضافه شده)
export type CalendarEvent = EventType;

// تایپ برای تنظیمات تقویم
export interface CalendarSettings {
  showHolidays: boolean;
  showEvents: boolean;
  theme: 'light' | 'dark';
  language: 'fa' | 'en';
}

// تایپ برای وضعیت تقویم
export interface CalendarState {
  currentMonth: { year: number; month: number };
  selectedDate?: PersianDate;
  events: EventType[];
  eventTypes: EventCategory[];
  holidays: Set<string>;
  settings: CalendarSettings;
}

// تایپ برای props کامپوننت‌های تقویم
export interface CalendarComponentProps {
  year: number;
  month: number;
  selectedDate?: PersianDate;
  onSelectDate?: (date: PersianDate) => void;
  events?: EventType[];
  holidays?: Set<string>;
}
