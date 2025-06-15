export class PersianCalendar {
  private monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد',
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر',
    'دی', 'بهمن', 'اسفند'
  ];

  private weekDays = [
    'شنبه', 'یکشنبه', 'دوشنبه',
    'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
  ];

  // Get current Persian date
  getCurrentDate(): { year: number; month: number; day: number } {
    const today = new Date();
    return this.gregorianToPersian(today);
  }

  // Convert Gregorian to Persian
  gregorianToPersian(date: Date): { year: number; month: number; day: number } {
    // Simplified conversion - in production use a proper library like moment-jalaali
    const gy = date.getFullYear();
    const gm = date.getMonth() + 1;
    const gd = date.getDate();
    
    // This is a simplified algorithm
    let jy, jm, jd;
    const g_d_n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }
    
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_n[gm - 1];
    
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    
    return { year: jy, month: jm, day: jd };
  }

  // Convert Persian to Gregorian
  persianToGregorian(year: number, month: number, day: number): Date {
    // Simplified conversion
    let gy, gm, gd;
    let jy = year;
    const jm = month;
    const jd = day;
    
    if (jy > 979) {
      gy = 1600;
      jy -= 979;
    } else {
      gy = 621;
    }
    
    const days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    
    gy += 400 * Math.floor(days / 146097);
    let remainingDays = days % 146097;
    
    let leap = true;
    if (remainingDays >= 36525) {
      remainingDays--;
      gy += 100 * Math.floor(remainingDays / 36524);
      remainingDays %= 36524;
      if (remainingDays >= 365) {
        remainingDays++;
      }
    }
    
    gy += 4 * Math.floor(remainingDays / 1461);
    remainingDays %= 1461;
    
    if (remainingDays >= 366) {
      leap = false;
      remainingDays--;
      gy += Math.floor(remainingDays / 365);
      remainingDays = (remainingDays % 365);
    }
    
    const sal_a = [0, 31, ((leap) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    gm = 0;
    while (gm < 13 && remainingDays >= sal_a[gm]) {
      remainingDays -= sal_a[gm];
      gm++;
    }
    
    gd = remainingDays + 1;
    
    return new Date(gy, gm - 1, gd);
  }

  // Get month name
  getMonthName(month: number): string {
    return this.monthNames[month - 1] || '';
  }

  // Get all month names
  getMonthNames(): string[] {
    return [...this.monthNames];
  }

  // Get weekday name
  getWeekDayName(dayIndex: number): string {
    return this.weekDays[dayIndex] || '';
  }

  // Get all weekday names
  getWeekDays(): string[] {
    return [...this.weekDays];
  }

  // Get days in month
  getDaysInMonth(year: number, month: number): number {
    if (month <= 6) {
      return 31;
    } else if (month <= 11) {
      return 30;
    } else {
      // Check if leap year
      return this.isLeapYear(year) ? 30 : 29;
    }
  }

  // Check if Persian year is leap
  isLeapYear(year: number): boolean {
    const cycle = year + 1474;
    const grand = cycle % 128;
    
    return grand <= 28 ? ((grand % 33) % 4) === 1 : false;
  }

  // Get first day of month (0 = Saturday, 6 = Friday)
  getFirstDayOfMonth(year: number, month: number): number {
    const date = this.persianToGregorian(year, month, 1);
    // Convert JavaScript day (0 = Sunday) to Persian day (0 = Saturday)
    return (date.getDay() + 1) % 7;
  }

  // Format date to Persian string
  formatDate(year: number, month: number, day: number): string {
    return `${day} ${this.getMonthName(month)} ${year}`;
  }
}
