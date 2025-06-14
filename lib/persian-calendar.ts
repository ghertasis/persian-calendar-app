import { PersianDate } from '../types';

export function gregorianToPersian(gregorianDate: Date): PersianDate {
  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1;
  const gDay = gregorianDate.getDate();
  
  // الگوریتم تبدیل میلادی به شمسی
  let jYear: number;
  let jMonth: number;
  let jDay: number;
  
  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  
  if (gYear <= 1600) {
    jYear = 0;
    gYear -= 621;
  } else {
    jYear = 979;
    gYear -= 1600;
  }
  
  if (gMonth > 2) {
    gYear++;
  }
  
  const gDayNo = 365 * gYear + Math.floor((gYear + 3) / 4) - Math.floor((gYear + 99) / 100) + Math.floor((gYear + 399) / 400) - 80 + gDay + (gDaysInMonth.slice(0, gMonth - 1).reduce((a, b) => a + b, 0));
  
  jYear += 33 * Math.floor(gDayNo / 12053);
  gDayNo = gDayNo % 12053;
  
  jYear += 4 * Math.floor(gDayNo / 1461);
  gDayNo %= 1461;
  
  if (gDayNo > 365) {
    jYear += Math.floor((gDayNo - 1) / 365);
    gDayNo = (gDayNo - 1) % 365;
  }
  
  let dayOfYear = gDayNo + 1;
  
  if (dayOfYear <= 186) {
    jMonth = 1 + Math.floor(dayOfYear / 31);
    jDay = 1 + (dayOfYear % 31);
    if (jDay === 0) {
      jMonth--;
      jDay = 31;
    }
  } else {
    jMonth = 7 + Math.floor((dayOfYear - 187) / 30);
    jDay = 1 + ((dayOfYear - 187) % 30);
    if (jDay === 0) {
      jMonth--;
      jDay = 30;
    }
  }
  
  return { year: jYear, month: jMonth, day: jDay };
}

export function persianToGregorian(persianDate: PersianDate): Date {
  const { year: jYear, month: jMonth, day: jDay } = persianDate;
  
  let gYear: number;
  let gMonth: number;
  let gDay: number;
  
  if (jYear <= 979) {
    gYear = 1600;
    jYear += 621;
  } else {
    gYear = jYear + 1600;
    jYear -= 979;
  }
  
  let dayOfYear: number;
  if (jMonth < 7) {
    dayOfYear = (jMonth - 1) * 31 + jDay;
  } else {
    dayOfYear = 186 + (jMonth - 7) * 30 + jDay;
  }
  
  const gDayNo = 365 * jYear + Math.floor(jYear / 33) * 8 + Math.floor(((jYear % 33) + 3) / 4) + 78 + dayOfYear;
  
  gYear += Math.floor(gDayNo / 365.25);
  gDayNo = gDayNo % Math.floor(365.25 * gYear);
  
  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (gYear % 4 === 0 && (gYear % 100 !== 0 || gYear % 400 === 0)) {
    gDaysInMonth[1] = 29;
  }
  
  gMonth = 1;
  while (gMonth <= 12 && gDayNo > gDaysInMonth[gMonth - 1]) {
    gDayNo -= gDaysInMonth[gMonth - 1];
    gMonth++;
  }
  
  gDay = gDayNo;
  
  return new Date(gYear, gMonth - 1, gDay);
}

export function getPersianMonthName(month: number): string {
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return monthNames[month - 1] || '';
}

export function getPersianDayName(dayOfWeek: number): string {
  const dayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  return dayNames[dayOfWeek] || '';
}
