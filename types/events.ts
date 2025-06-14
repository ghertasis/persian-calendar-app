export interface Event {
  id: string;
  title: string;
  description?: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  type: 'holiday' | 'personal' | 'reminder';
  isImportant: boolean;
}

export interface EventsStore {
  events: Event[];
  holidays: Event[];
}

export interface EventFormData {
  title: string;
  description: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  type: 'personal' | 'reminder';
  isImportant: boolean;
}
