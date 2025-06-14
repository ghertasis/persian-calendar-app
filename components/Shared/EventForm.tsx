import React, { useState, useEffect } from 'react';
import { Event, EventType, PersianDate } from '../../types';

interface EventFormProps {
  event?: Event;
  defaultDate?: PersianDate;
  onSubmit: (event: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  defaultDate,
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [type, setType] = useState<EventType>(event?.type || 'personal');
  const [date, setDate] = useState<PersianDate>(
    event?.date || defaultDate || { year: 1404, month: 1, day: 1 }
  );
  const [time, setTime] = useState(event?.time || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('عنوان رویداد الزامی است');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      type,
      date,
      time: time || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label htmlFor="title">عنوان رویداد *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان رویداد را وارد کنید"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">توضیحات</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات اختیاری"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">نوع رویداد</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as EventType)}
        >
          <option value="personal">شخصی</option>
          <option value="work">کاری</option>
          <option value="important">مهم</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">سال</label>
          <input
            type="number"
            id="year"
            value={date.year}
            onChange={(e) => setDate({ ...date, year: parseInt(e.target.value) })}
            min="1400"
            max="1450"
          />
        </div>
        <div className="form-group">
          <label htmlFor="month">ماه</label>
          <input
            type="number"
            id="month"
            value={date.month}
            onChange={(e) => setDate({ ...date, month: parseInt(e.target.value) })}
            min="1"
            max="12"
          />
        </div>
        <div className="form-group">
          <label htmlFor="day">روز</label>
          <input
            type="number"
            id="day"
            value={date.day}
            onChange={(e) => setDate({ ...date, day: parseInt(e.target.value) })}
            min="1"
            max="31"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="time">ساعت (اختیاری)</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {event ? 'ویرایش' : 'ایجاد'} رویداد
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          انصراف
        </button>
      </div>
    </form>
  );
};
