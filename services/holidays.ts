import { Event } from '../types';

export class HolidaysService {
  private static holidays: Event[] = [
    {
      id: 'norooz-1',
      title: 'عید نوروز',
      date: { year: 1404, month: 1, day: 1 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: 'norooz-2',
      title: 'عید نوروز',
      date: { year: 1404, month: 1, day: 2 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: 'norooz-3',
      title: 'عید نوروز',
      date: { year: 1404, month: 1, day: 3 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: 'norooz-4',
      title: 'عید نوروز',
      date: { year: 1404, month: 1, day: 4 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: 'sizdah-bedar',
      title: 'سیزده بدر',
      date: { year: 1404, month: 1, day: 13 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: 'death-khomeini',
      title: 'رحلت امام خمینی',
      date: { year: 1404, month: 3, day: 14 },
      type: 'holiday',
      isImportant: true
    },
    {
      id: '15-khordad',
      title: 'قیام ۱۵ خرداد',
      date: { year: 1404, month: 3, day: 15 },
      type: 'holiday',
      isImportant: true
    }
  ];

  static getHolidaysForYear(year: number): Event[] {
    return this.holidays.filter(holiday => holiday.date.year === year);
  }

  static getHolidaysForMonth(year: number, month: number): Event[] {
    return this.holidays.filter(holiday => 
      holiday.date.year === year && holiday.date.month === month
    );
  }

  static isHoliday(year: number, month: number, day: number): boolean {
    return this.holidays.some(holiday =>
      holiday.date.year === year &&
      holiday.date.month === month &&
      holiday.date.day === day
    );
  }

  static getHolidayForDate(year: number, month: number, day: number): Event | null {
    return this.holidays.find(holiday =>
      holiday.date.year === year &&
      holiday.date.month === month &&
      holiday.date.day === day
    ) || null;
  }
}
