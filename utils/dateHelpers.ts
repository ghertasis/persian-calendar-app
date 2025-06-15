import { PersianCalendar } from './PersianCalendar';
import { Event } from '../types';

const persianCalendar = new PersianCalendar();

// Compare two Persian dates
export function compareDates(
  date1: { year: number; month: number; day: number },
  date2: { year: number; month: number; day: number }
): number {
  const num1 = date1.year * 10000 + date1.month * 100 + date1.day;
  const num2 = date2.year * 10000 + date2.month * 100 + date2.day;
  return num1 - num2;
}

// Check if two dates are equal
export function areDatesEqual(
  date1: { year: number; month: number; day: number },
  date2: { year: number; month: number; day: number }
): boolean {
  return date1.year === date2.year && 
         date1.month === date2.month && 
         date1.day === date2.day;
}

// Get events for a specific date
export function getEventsForDate(
  events: Event[],
  date: { year: number; month: number; day: number }
): Event[] {
  return events.filter(event => areDatesEqual(event.date, date));
}

// Sort events by date
export function sortEventsByDate(events: Event[]): Event[] {
  return [...events].sort((a, b) => compareDates(a.date, b.date));
}

// Get date range for a month
export function getMonthDateRange(year: number, month: number) {
  const daysInMonth = persianCalendar.getDaysInMonth(year, month);
  const startDate = { year, month, day: 1 };
  const endDate = { year, month, day: daysInMonth };
  
  return { startDate, endDate };
}

// Add days to a Persian date
export function addDays(
  date: { year: number; month: number; day: number },
  days: number
): { year: number; month: number; day: number } {
  const gregorian = persianCalendar.persianToGregorian(date.year, date.month, date.day);
  gregorian.setDate(gregorian.getDate() + days);
  return persianCalendar.gregorianToPersian(gregorian);
}

// Format time to Persian
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const m = parseInt(minutes);
  
  // Convert to Persian numbers if needed
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Parse reminder value to readable format
export function formatReminder(reminder: string): string {
  const reminders: Record<string, string> = {
    'none': 'بدون یادآوری',
    '5min': '۵ دقیقه قبل',
    '10min': '۱۰ دقیقه قبل',
    '30min': '۳۰ دقیقه قبل',
    '1hour': '۱ ساعت قبل',
    '1day': '۱ روز قبل'
  };
  
  return reminders[reminder] || reminder;
}
