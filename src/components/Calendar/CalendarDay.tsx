import React from 'react';
import { CalendarDay as CalendarDayType, Event } from '../../types';

interface CalendarDayProps {
  day: CalendarDayType;
  events: Event[];
  isSelected?: boolean;
  onDayClick: (day: CalendarDayType) => void;
  onEventClick?: (event: Event) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  events,
  isSelected = false,
  onDayClick,
  onEventClick
}) => {
  const handleDayClick = () => {
    onDayClick(day);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const dayClasses = [
    'calendar-day',
    day.isToday ? 'is-today' : '',
    day.isHoliday ? 'is-holiday' : '',
    day.isCurrentMonth ? 'current-month' : 'other-month',
    isSelected ? 'is-selected' : '',
    events.length > 0 ? 'has-events' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={dayClasses}
      onClick={handleDayClick}
    >
      <div className="day-number">
        {day.persianDate.day}
      </div>
      
      {events.length > 0 && (
        <div className="day-events">
          {events.slice(0, 3).map(event => (
            <div
              key={event.id}
              className={`event-dot ${event.type}`}
              title={event.title}
              onClick={(e) => handleEventClick(event, e)}
            />
          ))}
          {events.length > 3 && (
            <div className="more-events">
              +{events.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
