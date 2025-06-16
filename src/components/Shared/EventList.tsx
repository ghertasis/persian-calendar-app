import React from 'react';
import { Event, EventType } from '../../types';

interface EventListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  onEventEdit,
  onEventDelete
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        هیچ رویدادی برای امروز وجود ندارد
      </div>
    );
  }

  const getCategoryLabel = (category: EventType) => {
    const labels: Record<EventType, string> = {
      [EventType.WORK]: 'کاری',
      [EventType.PERSONAL]: 'شخصی',
      [EventType.MEETING]: 'جلسه',
      [EventType.REMINDER]: 'یادآوری',
      [EventType.HOLIDAY]: 'تعطیلات'
    };
    return labels[category] || 'نامشخص';
  };

  const getCategoryColor = (category: EventType) => {
    const colors: Record<EventType, string> = {
      [EventType.WORK]: 'bg-blue-100 text-blue-800',
      [EventType.PERSONAL]: 'bg-green-100 text-green-800',
      [EventType.MEETING]: 'bg-purple-100 text-purple-800',
      [EventType.REMINDER]: 'bg-yellow-100 text-yellow-800',
      [EventType.HOLIDAY]: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className={`
            p-4 border rounded-lg cursor-pointer transition-all duration-200
            ${event.isImportant ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}
            hover:shadow-md hover:border-gray-300
          `}
          onClick={() => onEventClick?.(event)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-medium ${event.isImportant ? 'text-red-900' : 'text-gray-900'}`}>
                  {event.title}
                  {event.isImportant && (
                    <span className="text-red-500 mr-1">⭐</span>
                  )}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(event.category)}`}>
                  {getCategoryLabel(event.category)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-1">
                {event.startTime} - {event.endTime}
              </div>
              
              <div className="text-xs text-gray-500 mb-2">
                {event.date.year}/{event.date.month}/{event.date.day}
              </div>
              
              {event.description && (
                <div className="text-sm text-gray-500 mt-2">
                  {event.description}
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mr-4">
              {onEventEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventEdit(event);
                  }}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  ویرایش
                </button>
              )}
              
              {onEventDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventDelete(event.id);
                  }}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  حذف
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
