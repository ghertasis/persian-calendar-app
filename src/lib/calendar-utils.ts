import { PersianMonth, PersianDate, CalendarMonth } from "../types/calendar";

// نام ماه‌های فارسی
const monthNames: Record<PersianMonth, string> = {
  1: "فروردین",
  2: "اردیبهشت", 
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};

export const getMonthName = (month: PersianMonth): string => {
  return monthNames[month] || "";
};

// تعداد روزهای هر ماه شمسی
export const getDaysInMonth = (year: number, month: number): number => {
  if (month >= 1 && month <= 6) {
    return 31; // فروردین تا شهریور
  } else if (month >= 7 && month <= 11) {
    return 30; // مهر تا بهمن
  } else if (month === 12) {
    // اسفند - بررسی سال کبیسه
    return isLeapYear(year) ? 30 : 29;
  }
  return 30; // پیش‌فرض
};

// بررسی سال کبیسه شمسی (اصلاح شده)
export const isLeapYear = (year: number): boolean => {
  const breaks = [
    -14, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99
  ];
  
  let leap = -14;
  let jp = breaks[0];
  
  for (let j = 1; j <= breaks.length; j++) {
    const jm = breaks[j];
    if (!jm) break;
    const jump = jm - jp; // تعریف متغیر jump
    if (year < jm) break;
    leap += Math.floor(jump / 33) * 8 + Math.floor(((jump % 33) + 3) / 4);
    jp = jm;
  }
  
  const n = year - jp;
  const lastJump = breaks[breaks.length - 1] - jp; // تعریف jump برای استفاده در پایین
  
  if (n < lastJump) {
    leap += Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
    if ((lastJump % 33) === 4 && (lastJump - n) === 4) leap++;
  }
  
  return (leap + 4) % 1029 % 33 % 4 === 1;
};

// روز اول هفته برای ماه مشخص (0 = شنبه، 6 = جمعه)
export const getFirstDayOfWeek = (year: number, month: number): number => {
  // محاسبه ساده روز اول ماه
  // این باید با تابع دقیق تبدیل تاریخ جایگزین شود
  const totalDays = (year - 1) * 365 + Math.floor((year - 1) / 4);
  for (let i = 1; i < month; i++) {
    totalDays + getDaysInMonth(year, i);
  }
  return totalDays % 7;
};

// تولید تقویم ماه (تابع جدید)
export const generateCalendarMonth = (year: number, month: number): CalendarMonth => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  
  const days = [];
  
  // روزهای خالی ابتدای ماه
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonthDays = getDaysInMonth(prevYear, prevMonth);
    
    days.push({
      day: prevMonthDays - firstDayOfWeek + i + 1,
      isCurrentMonth: false,
      date: { year: prevYear, month: prevMonth, day: prevMonthDays - firstDayOfWeek + i + 1 }
    });
  }
  
  // روزهای ماه جاری
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      date: { year, month, day }
    });
  }
  
  // روزهای ابتدای ماه بعد (تا تکمیل 42 روز)
  const remainingDays = 42 - days.length;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      date: { year: nextYear, month: nextMonth, day }
    });
  }
  
  return { year, month, days };
};

// تبدیل تاریخ میلادی به شمسی (نمونه ساده)
export const gregorianToPersian = (gDate: Date): PersianDate => {
  // این یک تابع ساده است و باید با تابع دقیق جایگزین شود
  return {
    year: 1403,
    month: 4,
    day: 15
  };
};

// تبدیل تاریخ شمسی به میلادی (نمونه ساده)
export const persianToGregorian = (year: number, month: number, day: number): Date => {
  // این یک تابع ساده است و باید با تابع دقیق جایگزین شود
  return new Date();
};
