import { Event, EventFormData } from '../types';

export class EventsService {
  private static STORAGE_KEY = 'persian-calendar-events';

  static getEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveEvents(events: Event[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch {
      // Handle storage errors silently
    }
  }

  static addEvent(eventData: EventFormData): Event {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData
    };

    const events = this.getEvents();
    events.push(newEvent);
    this.saveEvents(events);

    return newEvent;
  }

  static updateEvent(id: string, eventData: Partial<EventFormData>): Event | null {
    const events = this.getEvents();
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) return null;

    const updatedEvent = { ...events[eventIndex], ...eventData };
    events[eventIndex] = updatedEvent;
    this.saveEvents(events);

    return updatedEvent;
  }

  static deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filteredEvents = events.filter(e => e.id !== id);

    if (filteredEvents.length === events.length) return false;

    this.saveEvents(filteredEvents);
    return true;
  }

  static getEventsForDate(year: number, month: number, day: number): Event[] {
    const events = this.getEvents();
    return events.filter(event => 
      event.date.year === year &&
      event.date.month === month &&
      event.date.day === day
    );
  }
}
