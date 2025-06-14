// components/Calendar/CalendarMonth.tsx
import React from 'react';
import { CalendarMonth as CalendarMonthType, CalendarDay, Event } from '../../types';
import { CalendarWeek } from './CalendarWeek';

interface CalendarMonthProps {
  month: CalendarMonthType;
  events: Event[];
  selectedDate?: CalendarDay;
  onDayClick: (day: CalendarDay) => void;
  onEventClick?: (event: Event) => void;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  events,
  selectedDate,
  onDayClick,
  onEventClick
}) => {
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  return (
    <div className="calendar-month">
      {/* هدر روزهای هفته */}
      <div className="calendar-header">
        {weekDays.map(day => (
          <div key={day} className="week-day-header">
            {day}
          </div>
        ))}
      </div>
      
      {/* هفته‌های ماه */}
      <div className="calendar-body">
        {month.weeks.map((week, index) => (
          <CalendarWeek
            key={index}
            week={week}
            events={events}
            selectedDate={selectedDate}
            onDayClick={onDayClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};
