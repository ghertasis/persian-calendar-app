import React from 'react';
import { CalendarWeek as CalendarWeekType, CalendarDay, Event } from '../../types';
import { CalendarDay as CalendarDayComponent } from './CalendarDay';

interface CalendarWeekProps {
  week: CalendarWeekType;
  events: Event[];
  selectedDate?: CalendarDay;
  onDayClick: (day: CalendarDay) => void;
  onEventClick?: (event: Event) => void;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  week,
  events,
  selectedDate,
  onDayClick,
  onEventClick
}) => {
  const getEventsForDay = (day: CalendarDay): Event[] => {
    return events.filter(event =>
      event.date.year === day.persianDate.year &&
      event.date.month === day.persianDate.month &&
      event.date.day === day.persianDate.day
    );
  };

  const isDaySelected = (day: CalendarDay): boolean => {
    if (!selectedDate) return false;
    
    return (
      selectedDate.persianDate.year === day.persianDate.year &&
      selectedDate.persianDate.month === day.persianDate.month &&
      selectedDate.persianDate.day === day.persianDate.day
    );
  };

  return (
    <div className="calendar-week">
      {week.days.map((day, index) => (
        <CalendarDayComponent
          key={`${day.persianDate.year}-${day.persianDate.month}-${day.persianDate.day}`}
          day={day}
          events={getEventsForDay(day)}
          isSelected={isDaySelected(day)}
          onDayClick={onDayClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};
