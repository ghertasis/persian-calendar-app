import React, { useState } from 'react';
import { EventFormData, EventType, Event, PersianDate } from '../../types';

interface EventFormProps {
  onSubmit: (eventData: EventFormData) => void;
  onCancel: () => void;
  onSave?: (eventData: Omit<Event, "id">) => void;
  event?: Event;
  initialData?: Partial<EventFormData>;
  selectedDate?: PersianDate;
}

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onCancel,
  onSave,
  event,
  initialData,
  selectedDate
}) => {
  const currentDate = selectedDate || { year: 1403, month: 1, day: 1 };

  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || initialData?.title || '',
    date: event?.date || initialData?.date || currentDate,
    type: event?.type || initialData?.type || EventType.PERSONAL,
    startTime: event?.startTime || initialData?.startTime || '',
    endTime: event?.endTime || initialData?.endTime || '',
    category: event?.category || initialData?.category || EventType.PERSONAL,
    isImportant: event?.isImportant || initialData?.isImportant || false,
    description: event?.description || initialData?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave && event) {
      // For editing existing events
      const eventData: Omit<Event, "id"> = {
        ...formData,
        type: formData.category // Ensure type matches category
      };
      onSave(eventData);
    } else {
      // For creating new events
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'category') {
      const categoryValue = value as EventType;
      setFormData(prev => ({
        ...prev,
        [name]: categoryValue,
        type: categoryValue // Keep type in sync with category
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {event ? 'ویرایش رویداد' : 'رویداد جدید'}
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          عنوان رویداد
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            زمان شروع
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            زمان پایان
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          دسته‌بندی
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        >
          <option value={EventType.WORK}>کاری</option>
          <option value={EventType.PERSONAL}>شخصی</option>
          <option value={EventType.MEETING}>جلسه</option>
          <option value={EventType.REMINDER}>یادآوری</option>
          <option value={EventType.HOLIDAY}>تعطیلات</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          توضیحات (اختیاری)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isImportant"
            checked={formData.isImportant}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="mr-2 text-sm text-gray-700">مهم</span>
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors ml-2"
        >
          لغو
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          {event ? 'ویرایش' : 'ذخیره'}
        </button>
      </div>
    </form>
  );
};
