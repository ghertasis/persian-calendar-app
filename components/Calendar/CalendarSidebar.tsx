import React from 'react';
import { Event, EventType } from '../../types';
import { Button } from '../Shared';
import { PersianCalendar } from '../../utils/PersianCalendar';

interface CalendarSidebarProps {
  selectedDate?: { year: number; month: number; day: number };
  events: Event[];
  eventTypes: EventType[];
  selectedTypes: string[];
  onTypeToggle: (typeId: string) => void;
  onQuickDateSelect: (date: { year: number; month: number; day: number }) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  events,
  eventTypes,
  selectedTypes,
  onTypeToggle,
  onQuickDateSelect
}) => {
  const persianCalendar = new PersianCalendar();
  const today = persianCalendar.getCurrentDate();
  
  // Get upcoming events
  const upcomingEvents = events
    .filter(event => {
      const eventDateNum = event.date.year * 10000 + event.date.month * 100 + event.date.day;
      const todayDateNum = today.year * 10000 + today.month * 100 + today.day;
      return eventDateNum >= todayDateNum;
    })
    .sort((a, b) => {
      const aNum = a.date.year * 10000 + a.date.month * 100 + a.date.day;
      const bNum = b.date.year * 10000 + b.date.month * 100 + b.date.day;
      return aNum - bNum;
    })
    .slice(0, 5);

  return (
    <div className="calendar-sidebar">
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">تاریخ انتخاب شده</h3>
          <div className="selected-date-info">
            <div className="selected-date-day">{selectedDate.day}</div>
            <div className="selected-date-month-year">
              {persianCalendar.getMonthName(selectedDate.month)} {selectedDate.year}
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Date Selection */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">دسترسی سریع</h3>
        <div className="quick-date-buttons">
          <Button
            variant="outline"
            size="small"
            fullWidth
            onClick={() => onQuickDateSelect(today)}
          >
            امروز
          </Button>
          <Button
            variant="outline"
            size="small"
            fullWidth
            onClick={() => {
              const tomorrow = { ...today, day: today.day + 1 };
              onQuickDateSelect(tomorrow);
            }}
          >
            فردا
          </Button>
        </div>
      </div>
      
      {/* Event Type Filter */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">فیلتر نوع رویداد</h3>
        <div className="event-type-filters">
          {eventTypes.map(type => (
            <label key={type.id} className="event-type-filter">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.id)}
                onChange={() => onTypeToggle(type.id)}
              />
              <span 
                className="event-type-color" 
                style={{ backgroundColor: type.color }}
              ></span>
              <span className="event-type-name">{type.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">رویدادهای پیش رو</h3>
        <div className="upcoming-events">
          {upcomingEvents.length === 0 ? (
            <p className="no-events">رویدادی وجود ندارد</p>
          ) : (
            upcomingEvents.map(event => (
              <div key={event.id} className="upcoming-event">
                <div className="upcoming-event-date">
                  {event.date.day} {persianCalendar.getMonthName(event.date.month)}
                </div>
                <div className="upcoming-event-title">{event.title}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
