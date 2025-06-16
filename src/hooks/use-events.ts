import { useState } from 'react';
import { Event, EventFormData, EventType } from '../types';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      type: eventData.category, // Use category as type for compatibility
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getEventsForDate = (year: number, month: number, day: number) => {
    return events.filter(event => 
      event.date.year === year &&
      event.date.month === month &&
      event.date.day === day
    );
  };

  const getEventsForMonth = (year: number, month: number) => {
    return events.filter(event => 
      event.date.year === year &&
      event.date.month === month
    );
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsForDate,
    getEventsForMonth,
  };
}
