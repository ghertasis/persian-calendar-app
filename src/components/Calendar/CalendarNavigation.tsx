import React from 'react';
import { PersianDate } from '../../types';

interface CalendarNavigationProps {
  currentMonth: PersianDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onToday
}) => {
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  return (
    <div className="calendar-navigation flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevMonth}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          ← ماه قبل
        </button>
        <button
          onClick={onNextMonth}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          ماه بعد →
        </button>
      </div>
      
      <div className="text-xl font-bold text-gray-800">
        {monthNames[currentMonth.month - 1]} {currentMonth.year}
      </div>
      
      <button
        onClick={onToday}
        className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
      >
        امروز
      </button>
    </div>
  );
};
