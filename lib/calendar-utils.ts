import { CalendarDay, CalendarWeek, CalendarMonth, PersianDate } from '../types';
import { gregorianToPersian, persianToGregorian } from './persian-calendar';

export function generateCalendarMonth(year: number, month: number): CalendarMonth {
  const weeks: CalendarWeek[] = [];
  
  // اولین روز ماه
  const firstDayOfMonth = persianToGregorian({ year, month, day: 1 });
  const startOfWeek = new Date(firstDayOfMonth);
  startOfWeek.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  
  // تولید 6 هفته (42 روز)
  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    const days: CalendarDay[] = [];
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + (weekIndex * 7) + dayIndex);
      
      const persianDate = gregorianToPersian(currentDate);
      const isCurrentMonth = persianDate.month === month;
      const isToday = isDateToday(currentDate);
      
      days.push({
        persianDate,
        gregorianDate: currentDate,
        isCurrentMonth,
        isToday,
        events: []
      });
    }
    
    weeks.push({ days });
  }
  
  return { year, month, weeks };
}

export function isDateToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isSameDate(date1: PersianDate, date2: PersianDate): boolean {
  return date1.year === date2.year && 
         date1.month === date2.month && 
         date1.day === date2.day;
}

export function isLeapYear(year: number): boolean {
  // قانون سال کبیسه شمسی
  const breaks = [
    -14, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];
  
  let jump = 0;
  for (let j = 1; j < breaks.length; j++) {
    const jm = breaks[j];
    jump = jm - breaks[j - 1];
    if (year < jm) break;
  }
  
  let n = year - breaks[breaks.length - 2];
  
  if (n < jump) {
    if (jump - n < 6) n = n - jump + ((jump + 4) / 6) * 6;
    
    let leap;
    if (jump === 33) {
      leap = [1, 5, 9, 13, 17, 22, 26, 30];
    } else {
      leap = [1, 5, 9, 13, 17, 21, 26, 30];
    }
    
    return leap.includes(n % 33);
  }
  
  return false;
}

export function getDaysInPersianMonth(year: number, month: number): number {
  if (month <= 6) {
    return 31;
  } else if (month <= 11) {
    return 30;
  } else {
    return isLeapYear(year) ? 30 : 29;
  }
}

export function formatPersianDate(date: PersianDate): string {
  return `${date.year}/${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}`;
}
