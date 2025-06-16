import React from 'react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  monthLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  monthLabel,
  onPrevMonth,
  onNextMonth,
  onToday
}) => {
  return (
    <div className="calendar-header flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevMonth}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          قبلی
        </button>
        <button
          onClick={onNextMonth}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          بعدی
        </button>
        <button
          onClick={onToday}
          className="px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          امروز
        </button>
      </div>
      
      <div className="text-lg font-semibold">
        {monthLabel} {year}
      </div>
    </div>
  );
};
