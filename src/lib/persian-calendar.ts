export function isLeapPersianYear(year: number): boolean {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];
  
  let gy = year + 1595;
  let leap = -14;
  let jp = breaks[0];
  
  let jump = 0;
  for (let j = 1; j < breaks.length; j++) {
    let jm = breaks[j];
    jump = jm - jp;
    if (year < jm) break;
    leap += 683 * Math.floor(jump / 2816);
    leap += 666 * Math.floor((jump % 2816) / 2134);
    leap += 2 * Math.floor(((jump % 2816) % 2134) / 2);
    jp = jm;
  }
  
  let n = year - jp;
  
  if (n < jump) {
    leap += 683 * Math.floor(n / 2816);
    leap += 666 * Math.floor((n % 2816) / 2134);
    leap += 2 * Math.floor(((n % 2816) % 2134) / 2);
    
    if ((jump % 2816) < 682) {
      jump = jump % 2816;
    } else {
      jump = jump % 2816 + 2816;
    }
    
    if ((n % 2816) >= jump) {
      leap++;
    }
  }
  
  return (leap + 4) % 4 === 0;
}

export function isLeapGregorianYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInGregorianMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapGregorianYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

export function gregorianToPersian(gy: number, gm: number, gd: number): [number, number, number] {
  let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  
  let py: number, pm: number, pd: number;
  let gy2: number; // Fix: Declare gy2 properly
  
  if (gy <= 1600) {
    let jy = 0;
    gy -= 621;
  } else {
    let jy = 979;
    gy -= 1600;
  }
  
  if (gm > 2) {
    gy2 = gy + 1; // Fix: Remove 'let' since it's already declared
  } else {
    gy2 = gy; // Fix: Remove 'let' since it's already declared
  }
  
  let days = (365 * gy) + Math.floor((gy2 + 3) / 4) + Math.floor((gy2 + 99) / 100) - Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  
  py = -1029 + 33 * Math.floor(days / 12053);
  days %= 12053;
  
  py += 4 * Math.floor(days / 1461);
  days %= 1461;
  
  if (days > 365) {
    py += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  
  if (days < 186) {
    pm = 1 + Math.floor(days / 31);
    pd = 1 + (days % 31);
  } else {
    pm = 7 + Math.floor((days - 186) / 30);
    pd = 1 + ((days - 186) % 30);
  }
  
  return [py, pm, pd];
}

export function persianToGregorian(py: number, pm: number, pd: number): [number, number, number] {
  let gy: number, gm: number, gd: number;
  
  let epyear = py - 979;
  let epday = 0;
  
  if (py >= 0) {
    epyear = py - 979;
  } else {
    epyear = py - 978;
  }
  
  if (pm <= 6) {
    epday = (pm - 1) * 31 + pd;
  } else {
    epday = 6 * 31 + (pm - 7) * 30 + pd;
  }
  
  let auxDay = Math.floor(epyear / 33) * 12053;
  epyear %= 33;
  
  auxDay += Math.floor(epyear / 4) * 1461;
  epyear %= 4;
  
  if (epyear >= 1) {
    auxDay += (epyear - 1) * 365 + Math.floor(epyear / 4);
  }
  
  auxDay += epday + 79;
  
  gy = 1600 + Math.floor(auxDay / 365.2425);
  auxDay -= Math.floor((gy - 1600) * 365.2425);
  
  if (auxDay <= 0) {
    gy--;
    auxDay += isLeapGregorianYear(gy) ? 366 : 365;
  }
  
  let monthDays = [31, isLeapGregorianYear(gy) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  gm = 1;
  while (gm <= 12 && auxDay > monthDays[gm - 1]) {
    auxDay -= monthDays[gm - 1];
    gm++;
  }
  
  gd = auxDay;
  
  return [gy, gm, gd];
}
