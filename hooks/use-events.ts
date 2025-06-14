import { useState, useEffect, useCallback } from 'react';
import { Event, EventFormData, PersianDate } from '../types';
import { EventsService } from '../services';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const loadedEvents = EventsService.getEvents();
        setEvents(loadedEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const addEvent = useCallback((eventData: EventFormData) => {
    try {
      const newEvent = EventsService.addEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }, []);

  const updateEvent = useCallback((id: string, eventData: Partial<EventFormData>) => {
    try {
      const updatedEvent = EventsService.updateEvent(id, eventData);
      if (updatedEvent) {
        setEvents(prev => 
          prev.map(event => event.id === id ? updatedEvent : event)
        );
      }
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }, []);

  const deleteEvent = useCallback((id: string) => {
    try {
      const success = EventsService.deleteEvent(id);
      if (success) {
        setEvents(prev => prev.filter(event => event.id !== id));
      }
      return success;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }, []);

  const getEventsForDate = useCallback((date: PersianDate) => {
    return EventsService.getEventsForDate(date.year, date.month, date.day);
  }, []);

  const getEventsForMonth = useCallback((year: number, month: number) => {
    return events.filter(event => 
      event.date.year === year && event.date.month === month
    );
  }, [events]);

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getEventsForMonth
  };
};
