import React from 'react';
import { Event, EventType } from '../../types';

interface CalendarSidebarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
  onAddEvent?: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  events,
  onEventClick,
  onEventEdit,
  onEventDelete,
  onAddEvent
}) => {
  const getCategoryLabel = (category: EventType): string => {
    switch (category) {
      case EventType.WORK:
        return 'کاری';
      case EventType.PERSONAL:
        return 'شخصی';
      case EventType.MEETING:
        return 'جلسه';
      case EventType.REMINDER:
        return 'یادآوری';
      case EventType.HOLIDAY:
        return 'تعطیلات';
      default:
        return 'نامشخص';
    }
  };

  const getCategoryColor = (category: EventType): string => {
    switch (category) {
      case EventType.WORK:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case EventType.PERSONAL:
        return 'bg-green-100 text-green-800 border-green-200';
      case EventType.MEETING:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case EventType.REMINDER:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case EventType.HOLIDAY:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const todayEvents = events.filter(event => {
    // For now, show all events. In a real app, you'd filter by today's date
    return true;
  });

  const upcomingEvents = events.filter(event => {
    // For now, show all events. In a real app, you'd filter by upcoming dates
    return true;
  }).slice(0, 5); // Show only first 5

  return (
    <div className="calendar-sidebar bg-white border-l border-gray-200 w-80 h-full overflow-y-auto">
      <div className="p-4">
        {/* Add Event Button */}
        <button
          onClick={onAddEvent}
          className="w-full mb-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + رویداد جدید
        </button>

        {/* Today's Events */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">رویدادهای امروز</h3>
          {todayEvents.length === 0 ? (
            <p className="text-gray-500 text-sm">هیچ رویدادی برای امروز وجود ندارد</p>
          ) : (
            <div className="space-y-2">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`
                    p-3 border rounded-lg cursor-pointer transition-all duration-200
                    ${event.isImportant ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}
                    hover:shadow-md hover:border-gray-300
                  `}
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${event.isImportant ? 'text-red-900' : 'text-gray-900'}`}>
                        {event.title}
                        {event.isImportant && (
                          <span className="text-red-500 mr-1">⭐</span>
                        )}
                      </h4>
                      
                      <div className="text-xs text-gray-600 mt-1">
                        {event.startTime} - {event.endTime}
                      </div>
                      
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getCategoryColor(event.category)}`}>
                        {getCategoryLabel(event.category)}
                      </span>
                    </div>
                    
                    <div className="flex gap-1 mr-2">
                      {onEventEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventEdit(event);
                          }}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
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
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">رویدادهای آینده</h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-sm">هیچ رویداد آینده‌ای وجود ندارد</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onEventClick?.(event)}
                >
                  <h4 className="font-medium text-sm text-gray-900">
                    {event.title}
                  </h4>
                  <div className="text-xs text-gray-600 mt-1">
                    {event.date.day}/{event.date.month} - {event.startTime}
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getCategoryColor(event.category)}`}>
                    {getCategoryLabel(event.category)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};