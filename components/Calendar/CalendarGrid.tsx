import React from 'react';
import { Event } from '../../types';
import { PersianCalendar } from '../../utils/PersianCalendar';
import { CalendarDaySkeleton } from '../Shared';

interface CalendarGridProps {
  year: number;
  month: number;
  events: Event[];
  selectedDate?: { year: number; month: number; day: number };
  onDateSelect: (date: { year: number; month: number; day: number }) => void;
  onDateDoubleClick?: (date: { year: number; month: number; day: number }) => void;
  loading?: boolean;
  highlightToday?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  events,
  selectedDate,
  onDateSelect,
  onDateDoubleClick,
  loading = false,
  highlightToday = true
}) => {
  const persianCalendar = new PersianCalendar();
  
  // Get calendar data for the month
  const monthData = persianCalendar.getMonthData(year, month);
  const monthName = persianCalendar.getMonthName(month);
  const weekDays = persianCalendar.getWeekDayNames();
  
  // Get today's date in Persian
  const today = persianCalendar.getCurrentDate();
  
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = `${event.date.year}-${event.date.month}-${event.date.day}`;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Helper function to check if a date is today
  const isToday = (day: number) => {
    return highlightToday && 
           today.year === year && 
           today.month === month && 
           today.day === day;
  };

  // Helper function to check if a date is selected
  const isSelected = (day: number) => {
    return selectedDate &&
           selectedDate.year === year &&
           selectedDate.month === month &&
           selectedDate.day === day;
  };

  // Helper function to get events for a specific day
  const getDayEvents = (day: number) => {
    const dateKey = `${year}-${month}-${day}`;
    return eventsByDate[dateKey] || [];
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    onDateSelect({ year, month, day });
  };

  // Handle date double click
  const handleDateDoubleClick = (day: number) => {
    if (onDateDoubleClick) {
      onDateDoubleClick({ year, month, day });
    }
  };

  if (loading) {
    return (
      <div className="calendar-grid-container">
        <div className="calendar-header">
          <h2 className="calendar-month-title">{monthName} {year}</h2>
        </div>
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {weekDays.map((dayName) => (
              <div key={dayName} className="calendar-weekday">
                {dayName}
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {Array.from({ length: 42 }).map((_, index) => (
              <CalendarDaySkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-grid-container">
      <div className="calendar-header">
        <h2 className="calendar-month-title">{monthName} {year}</h2>
      </div>
      
      <div className="calendar-grid">
        {/* Week day headers */}
        <div className="calendar-weekdays">
          {weekDays.map((dayName) => (
            <div key={dayName} className="calendar-weekday">
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="calendar-days">
          {/* Empty cells for days before month start */}
          {Array.from({ length: monthData.startWeekDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day calendar-day-empty"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: monthData.daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getDayEvents(day);
            const dayClasses = [
              'calendar-day',
              isToday(day) ? 'calendar-day-today' : '',
              isSelected(day) ? 'calendar-day-selected' : '',
              dayEvents.length > 0 ? 'calendar-day-has-events' : ''
            ].filter(Boolean).join(' ');

            return (
              <div
                key={day}
                className={dayClasses}
                onClick={() => handleDateClick(day)}
                onDoubleClick={() => handleDateDoubleClick(day)}
              >
                <div className="calendar-day-number">{day}</div>
                
                {/* Event indicators */}
                {dayEvents.length > 0 && (
                  <div className="calendar-day-events">
                    {dayEvents.slice(0, 3).map((event, eventIndex) => (
                      <div
                        key={event.id}
                        className={`calendar-event-indicator calendar-event-${event.type}`}
                        title={event.title}
                      >
                        <span className="calendar-event-dot"></span>
                        <span className="calendar-event-title">{event.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="calendar-event-more">
                        +{dayEvents.length - 3} بیشتر
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
