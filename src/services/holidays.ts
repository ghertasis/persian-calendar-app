import { Event, EventType } from '../types';

export interface Holiday extends Event {
  date: {
    year: number;
    month: number;
    day: number;
  };
}

export class HolidayService {
  private holidays: Holiday[] = [
    {
      id: 'nowruz-1',
      title: 'جشن نوروز',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 1, day: 1 },
    },
    {
      id: 'nowruz-2',
      title: 'تعطیلات نوروز',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 1, day: 2 },
    },
    {
      id: 'nowruz-3',
      title: 'تعطیلات نوروز',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 1, day: 3 },
    },
    {
      id: 'nowruz-4',
      title: 'تعطیلات نوروز',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 1, day: 4 },
    },
    {
      id: 'sizdah-bedar',
      title: 'سیزده بدر',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 1, day: 13 },
    },
    {
      id: 'imam-ali-death',
      title: 'شهادت حضرت علی',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 3, day: 14 },
    },
    {
      id: 'besat',
      title: 'مبعث رسول اکرم',
      startTime: '00:00',
      endTime: '23:59',
      type: EventType.HOLIDAY,
      category: EventType.HOLIDAY,
      isImportant: true,
      date: { year: 1404, month: 3, day: 15 },
    }
  ];

  getHolidaysForYear(year: number): Holiday[] {
    return this.holidays.filter(holiday => holiday.date.year === year);
  }

  getHolidaysForMonth(year: number, month: number): Holiday[] {
    return this.holidays.filter(holiday => 
      holiday.date.year === year && holiday.date.month === month
    );
  }

  isHoliday(year: number, month: number, day: number): boolean {
    return this.holidays.some(holiday => 
      holiday.date.year === year &&
      holiday.date.month === month &&
      holiday.date.day === day
    );
  }

  getHoliday(year: number, month: number, day: number): Holiday | undefined {
    return this.holidays.find(holiday => 
      holiday.date.year === year &&
      holiday.date.month === month &&
      holiday.date.day === day
    );
  }
}

export const holidayService = new HolidayService();
