import React from 'react';

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthName,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="calendar-header-bar">
      <button className="calendar-nav-btn" onClick={onPrevMonth} title="ماه قبل">
        ‹
      </button>
      <span className="calendar-month-year">
        {monthName} {year}
      </span>
      <button className="calendar-nav-btn" onClick={onNextMonth} title="ماه بعد">
        ›
      </button>
      {onToday && (
        <button className="calendar-today-btn" onClick={onToday}>
          امروز
        </button>
      )}
    </div>
  );
};
