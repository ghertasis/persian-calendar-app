import React from 'react';
import { Event, PersianDate } from '../../types';

interface CalendarGridProps {
  currentDate: PersianDate;
  selectedDate?: PersianDate;
  events: Event[];
  onDateSelect: (date: PersianDate) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  events,
  onDateSelect
}) => {
  // Generate days for the current month
  const generateMonthDays = () => {
    const daysInMonth = getDaysInPersianMonth(currentDate.year, currentDate.month);
    const days: PersianDate[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        year: currentDate.year,
        month: currentDate.month,
        day
      });
    }
    
    return days;
  };

  const getDaysInPersianMonth = (year: number, month: number): number => {
    if (month <= 6) {
      return 31;
    } else if (month <= 11) {
      return 30;
    } else {
      // Check if it's a leap year for the last month (اسفند)
      return isLeapPersianYear(year) ? 30 : 29;
    }
  };

  const isLeapPersianYear = (year: number): boolean => {
    // Simple leap year calculation for Persian calendar
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
  };

  const getEventsForDate = (date: PersianDate) => {
    return events.filter(event => {
      // Assuming events have a date property or we need to match by some criteria
      // This would need to be adapted based on your actual event structure
      return true; // Placeholder
    });
  };

  const isSelectedDate = (date: PersianDate) => {
    if (!selectedDate) return false;
    return date.year === selectedDate.year &&
           date.month === selectedDate.month &&
           date.day === selectedDate.day;
  };

  const monthDays = generateMonthDays();
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']; // Persian week days

  return (
    <div className="calendar-grid">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((date) => {
          const dayEvents = getEventsForDate(date);
          const isSelected = isSelectedDate(date);
          
          return (
            <div
              key={`${date.year}-${date.month}-${date.day}`}
              className={`
                p-2 h-20 border rounded cursor-pointer transition-colors
                ${isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}
                ${dayEvents.length > 0 ? 'border-green-300' : ''}
              `}
              onClick={() => onDateSelect(date)}
            >
              <div className="text-sm font-medium">{date.day}</div>
              {dayEvents.length > 0 && (
                <div className="text-xs text-green-600 mt-1">
                  {dayEvents.length} رویداد
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
