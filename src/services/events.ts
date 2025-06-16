import { Event } from '../types';

const EVENTS_STORAGE_KEY = 'calendar_events';

export const loadEvents = (): Event[] => {
  try {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
};

export const saveEvent = (event: Event): Event => {
  try {
    const events = loadEvents();
    const existingIndex = events.findIndex(e => e.id === event.id);
    
    if (existingIndex >= 0) {
      events[existingIndex] = event;
    } else {
      events.push(event);
    }
    
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    return event;
  } catch (error) {
    console.error('Error saving event:', error);
    throw new Error('Failed to save event');
  }
};

export const deleteEvent = (id: string): void => {
  try {
    const events = loadEvents();
    const filtered = events.filter(event => event.id !== id);
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
};

export const saveEvents = (events: Event[]): void => {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events:', error);
    throw new Error('Failed to save events');
  }
};
