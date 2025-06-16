import React from 'react';
import { Event } from '../../types';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  isSelected: boolean;
  isToday: boolean;
  onClick: (date: Date) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  events,
  isSelected,
  isToday,
  onClick
}) => {
  return (
    <div 
      className="calendar-day"
      onClick={() => onClick(date)}
    >
      {/* Day implementation */}
    </div>
  );
};
