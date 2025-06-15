import React, { useState, useEffect, useMemo } from 'react';
import { Event, EventType } from './types';
import {
  CalendarHeader,
  CalendarNavigation,
  CalendarGrid,
  CalendarSidebar
} from './components/Calendar';
import {
  Modal,
  EventForm,
  EventList,
  Loading
} from './components/Shared';
import { PersianCalendar, getEventsForDate, sortEventsByDate } from './utils';
import './styles/main.css';

function App() {
  // State management
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([
    { id: '1', name: 'کاری', color: '#3B82F6' },
    { id: '2', name: 'شخصی', color: '#10B981' },
    { id: '3', name: 'خانوادگی', color: '#F59E0B' },
    { id: '4', name: 'دوستانه', color: '#8B5CF6' },
    { id: '5', name: 'پزشکی', color: '#EF4444' }
  ]);
  
  const [currentDate, setCurrentDate] = useState({ year: 0, month: 0, day: 0 });
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(eventTypes.map(t => t.id));
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showEventListModal, setShowEventListModal] = useState(false);

  const persianCalendar = new PersianCalendar();

  // Initialize current date
  useEffect(() => {
    const today = persianCalendar.getCurrentDate();
    setCurrentDate(today);
    setSelectedDate(today);
    
    // Load events from localStorage
    const savedEvents = localStorage.getItem('persian-calendar-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    
    setIsLoading(false);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0 || !isLoading) {
      localStorage.setItem('persian-calendar-events', JSON.stringify(events));
    }
  }, [events, isLoading]);

  // Filter events based on selected types
  const filteredEvents = useMemo(() => {
    return events.filter(event => selectedEventTypes.includes(event.typeId));
  }, [events, selectedEventTypes]);

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(filteredEvents, selectedDate);
  }, [filteredEvents, selectedDate]);

  // Handle month change
  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate({ ...currentDate, year, month });
  };

  // Handle today click
  const handleTodayClick = () => {
    const today = persianCalendar.getCurrentDate();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Handle date selection
  const handleDateSelect = (date: { year: number; month: number; day: number }) => {
    setSelectedDate(date);
    if (viewMode === 'month') {
      setShowEventListModal(true);
    }
  };

  // Handle event creation/update
  const handleEventSubmit = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : e
      ));
    } else {
      // Create new event
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents([...events, newEvent]);
    }
    
    setShowEventModal(false);
    setEditingEvent(null);
  };

  // Handle event deletion
  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  // Handle event edit
  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setShowEventModal(true);
    setShowEventListModal(false);
  };

  // Handle new event
  const handleNewEvent = (date?: { year: number; month: number; day: number }) => {
    if (date) {
      setSelectedDate(date);
    }
    setEditingEvent(null);
    setShowEventModal(true);
  };

  // Handle event type toggle
  const handleEventTypeToggle = (typeId: string) => {
    setSelectedEventTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="app">
      <CalendarHeader
        currentView={viewMode}
        onViewChange={setViewMode}
        onNewEvent={() => handleNewEvent()}
      />
      
      <div className="app-main">
        <CalendarSidebar
          selectedDate={selectedDate || undefined}
          events={filteredEvents}
          eventTypes={eventTypes}
          selectedTypes={selectedEventTypes}
          onTypeToggle={handleEventTypeToggle}
          onQuickDateSelect={handleDateSelect}
        />
        
        <div className="app-content">
          <CalendarNavigation
            year={currentDate.year}
            month={currentDate.month}
            onMonthChange={handleMonthChange}
            onTodayClick={handleTodayClick}
          />
          
          {viewMode === 'month' && (
            <CalendarGrid
              year={currentDate.year}
              month={currentDate.month}
              events={filteredEvents}
              eventTypes={eventTypes}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onDateDoubleClick={handleNewEvent}
              isLoading={false}
            />
          )}
          
          {viewMode === 'week' && (
            <div className="view-placeholder">
              <p>نمای هفتگی در حال توسعه است...</p>
            </div>
          )}
          
          {viewMode === 'day' && (
            <div className="view-placeholder">
              <p>نمای روزانه در حال توسعه است...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Event Form Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
        }}
        title={editingEvent ? 'ویرایش رویداد' : 'رویداد جدید'}
      >
        <EventForm
          event={editingEvent}
          eventTypes={eventTypes}
          defaultDate={selectedDate || currentDate}
          onSubmit={handleEventSubmit}
          onCancel={() => {
            setShowEventModal(false);
            setEditingEvent(null);
          }}
        />
      </Modal>
      
      {/* Event List Modal */}
      <Modal
        isOpen={showEventListModal}
        onClose={() => setShowEventListModal(false)}
        title={selectedDate ? `رویدادهای ${persianCalendar.formatDate(selectedDate.year, selectedDate.month, selectedDate.day)}` : ''}
      >
        <EventList
          events={selectedDateEvents}
          eventTypes={eventTypes}
          onEdit={handleEventEdit}
          onDelete={handleEventDelete}
          emptyMessage="رویدادی برای این روز ثبت نشده است"
        />
        {selectedDate && (
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleNewEvent(selectedDate);
                setShowEventListModal(false);
              }}
            >
              افزودن رویداد جدید
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
