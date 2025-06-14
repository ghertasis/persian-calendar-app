import React from 'react';
import { CalendarMonth } from './CalendarMonth';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay, Event } from '../../types';
import { useCalendar } from '../../hooks';
import { getMonthName } from '../../lib';

interface CalendarProps {
  events?: Event[];
  selectedDate?: CalendarDay;
  onDayClick?: (day: CalendarDay) => void;
  onEventClick?: (event: Event) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  events = [],
  selectedDate,
  onDayClick,
  onEventClick
}) => {
  const {
    currentMonth,
    goToNextMonth,
    goToPrevMonth,
    goToToday
  } = useCalendar();

  const handleDayClick = (day: CalendarDay) => {
    if (onDayClick) {
      onDayClick(day);
    }
  };

  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        monthName={getMonthName(currentMonth.month)}
        year={currentMonth.year}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />
      
      <CalendarMonth
        month={currentMonth}
        events={events}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
    </div>
  );
};
