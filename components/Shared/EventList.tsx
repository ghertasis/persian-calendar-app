import React from 'react';
import { Event, PersianDate } from '../../types';
import { isSameDate } from '../../utils/dateUtils';

interface EventListProps {
  events: Event[];
  selectedDate?: PersianDate;
  onEventClick?: (event: Event) => void;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
  showDate?: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  selectedDate,
  onEventClick,
  onEventEdit,
  onEventDelete,
  showDate = false
}) => {
  const filteredEvents = selectedDate 
    ? events.filter(event => isSameDate(event.date, selectedDate))
    : events;

  const sortedEvents = filteredEvents.sort((a, b) => {
    // Sort by time if available, otherwise by title
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    if (a.time && !b.time) return -1;
    if (!a.time && b.time) return 1;
    return a.title.localeCompare(b.title);
  });

  const getEventTypeClass = (type: Event['type']) => {
    switch (type) {
      case 'work':
        return 'event-work';
      case 'important':
        return 'event-important';
      default:
        return 'event-personal';
    }
  };

  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'work':
        return 'کاری';
      case 'important':
        return 'مهم';
      default:
        return 'شخصی';
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return '';
    return time;
  };

  if (sortedEvents.length === 0) {
    return (
      <div className="event-list-empty">
        <p>هیچ رویدادی {selectedDate ? 'برای این روز' : ''} یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="event-list">
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className={`event-item ${getEventTypeClass(event.type)}`}
          onClick={() => onEventClick?.(event)}
        >
          <div className="event-header">
            <h3 className="event-title">{event.title}</h3>
            <div className="event-actions">
              {onEventEdit && (
                <button
                  className="btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventEdit(event);
                  }}
                  title="ویرایش"
                >
                  ✏️
                </button>
              )}
              {onEventDelete && (
                <button
                  className="btn-icon btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('آیا مطمئن هستید که می‌خواهید این رویداد را حذف کنید؟')) {
                      onEventDelete(event.id);
                    }
                  }}
                  title="حذف"
                >
                  �️
                </button>
              )}
            </div>
          </div>

          <div className="event-meta">
            <span className="event-type">{getEventTypeLabel(event.type)}</span>
            {event.time && (
              <span className="event-time">{formatTime(event.time)}</span>
            )}
            {showDate && (
              <span className="event-date">
                {event.date.year}/{event.date.month}/{event.date.day