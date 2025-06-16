// Event types
export enum EventType {
  WORK = 'work',
  PERSONAL = 'personal',
  MEETING = 'meeting',
  REMINDER = 'reminder',
  HOLIDAY = 'holiday'
}

// Persian date interface
export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

// Main Event interface
export interface Event {
  id: string;
  title: string;
  date: PersianDate;
  type: EventType;
  startTime: string;
  endTime: string;
  category: EventType;
  isImportant: boolean;
  description?: string;
}

// Event form data (without id)
export interface EventFormData {
  title: string;
  date: PersianDate;
  type: EventType;
  startTime: string;
  endTime: string;
  category: EventType;
  isImportant: boolean;
  description?: string;
}

// Legacy alias
export type EventCategory = EventType;
