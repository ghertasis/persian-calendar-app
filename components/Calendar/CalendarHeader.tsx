import React from 'react';
import { Button } from '../Shared';

interface CalendarHeaderProps {
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  currentView: 'month' | 'week' | 'day';
  onNewEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  onViewChange,
  currentView,
  onNewEvent
}) => {
  return (
    <div className="calendar-header-container">
      <div className="calendar-header-section">
        <h1 className="calendar-title">تقویم فارسی</h1>
      </div>
      
      <div className="calendar-header-section calendar-view-switcher">
        <Button
          variant={currentView === 'month' ? 'primary' : 'outline'}
          size="small"
          onClick={() => onViewChange('month')}
        >
          ماه
        </Button>
        <Button
          variant={currentView === 'week' ? 'primary' : 'outline'}
          size="small"
          onClick={() => onViewChange('week')}
        >
          هفته
        </Button>
        <Button
          variant={currentView === 'day' ? 'primary' : 'outline'}
          size="small"
          onClick={() => onViewChange('day')}
        >
          روز
        </Button>
      </div>
      
      <div className="calendar-header-section">
        <Button
          variant="success"
          size="medium"
          icon="➕"
          onClick={onNewEvent}
        >
          رویداد جدید
        </Button>
      </div>
    </div>
  );
};
