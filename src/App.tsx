import React, { useState, useEffect } from 'react';
import './App.css';

// ایمپورت کامپوننت‌های تقویم
import {
  Calendar,
  CalendarHeader,
  CalendarNavigation,
  CalendarGrid,
  CalendarDay
} from './components/Calendar';

// ایمپورت کامپوننت‌های مشترک
import { EventForm, EventList } from './components/Shared';

// ایمپورت تایپ‌ها
import { PersianDate, EventType, Event, EventFormData } from './types';

// ایمپورت توابع کمکی
import { gregorianToPersian, getMonthName } from './lib';

// رنگ‌بندی انواع رویداد
const eventTypeColors = {
  [EventType.WORK]: '#3B82F6',
  [EventType.PERSONAL]: '#10B981', 
  [EventType.MEETING]: '#F59E0B',
  [EventType.REMINDER]: '#8B5CF6',
  [EventType.HOLIDAY]: '#EF4444'
};

function App() {
  // State ها
  const [currentDate, setCurrentDate] = useState<PersianDate>(() => {
    const today = new Date();
    return gregorianToPersian(today);
  });

  const [selectedDate, setSelectedDate] = useState<PersianDate | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>(
    Object.values(EventType)
  );

  // فیلتر کردن رویدادها
  const getFilteredEvents = () => {
    return events.filter(event => 
      selectedEventTypes.includes(event.type)
    );
  };

  // رویدادهای امروز
  const getTodayEvents = () => {
    const today = gregorianToPersian(new Date());
    return getFilteredEvents().filter(event => 
      event.date.year === today.year &&
      event.date.month === today.month &&
      event.date.day === today.day
    );
  };

  // رویدادهای ماه جاری
  const getCurrentMonthEvents = () => {
    return getFilteredEvents().filter(event => 
      event.date.year === currentDate.year &&
      event.date.month === currentDate.month
    );
  };

  // تابع ذخیره رویداد - اصلاح شده برای EventForm
  const handleSubmitEvent = (eventData: EventFormData) => {
    if (editingEvent) {
      // ویرایش رویداد موجود
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : event
      ));
    } else {
      // اضافه کردن رویداد جدید
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    setShowEventForm(false);
    setEditingEvent(undefined);
  };

  // تابع حذف رویداد
  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // تابع ویرایش رویداد
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  // تابع رفتن به ماه قبل
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12, day: 1 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  // تابع رفتن به ماه بعد
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1, day: 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  // تابع رفتن به امروز
  const handleTodayClick = () => {
    const today = gregorianToPersian(new Date());
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // تابع تغییر ماه
  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate({ year, month, day: 1 });
  };

  // تابع انتخاب تاریخ
  const handleDateSelect = (date: PersianDate) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <div className="main-content">
        {/* هدر کلی */}
        <CalendarHeader
          year={currentDate.year}
          month={currentDate.month}
          monthLabel={getMonthName(currentDate.month as any)}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleTodayClick}
        />

        <div className="calendar-container">
          <div className="calendar-main">
            {/* ناوبری تقویم */}
            <CalendarNavigation
              currentMonth={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onToday={handleTodayClick}
            />

            {/* شبکه تقویم - با onDateSelect prop */}
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              events={getCurrentMonthEvents()}
            />
          </div>

          {/* ساید بار */}
          <div className="calendar-sidebar">
            <div className="sidebar-section">
              <h3>رویدادهای امروز</h3>
              {/* EventList - اصلاح props */}
              <EventList
                events={getTodayEvents()}
                onEventEdit={handleEditEvent}
                onEventDelete={handleDeleteEvent}
              />
              {getTodayEvents().length === 0 && (
                <p className="empty-message">رویدادی برای امروز وجود ندارد</p>
              )}
            </div>

            <button 
              className="add-event-btn"
              onClick={() => setShowEventForm(true)}
            >
              + رویداد جدید
            </button>
          </div>
        </div>
      </div>

      {/* فرم رویداد - اصلاح props */}
      {showEventForm && (
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmitEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;
