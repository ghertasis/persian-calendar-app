import { useState, useCallback } from 'react';
import { PersianDate, CalendarMonth, NavigationState } from '../types';
import { generateCalendarMonth, gregorianToPersian } from '../lib';

export const useCalendar = (initialDate?: PersianDate) => {
  const today = gregorianToPersian(new Date());
  const [currentDate, setCurrentDate] = useState<PersianDate>(
    initialDate || today
  );

  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    direction: null
  });

  const currentMonth = generateCalendarMonth(
    currentDate.year, 
    currentDate.month
  );

  const goToNextMonth = useCallback(() => {
    setNavigationState({ isNavigating: true, direction: 'next' });
    
    setCurrentDate(prev => {
      if (prev.month === 12) {
        return { ...prev, year: prev.year + 1, month: 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });

    setTimeout(() => {
      setNavigationState({ isNavigating: false, direction: null });
    }, 300);
  }, []);

  const goToPrevMonth = useCallback(() => {
    setNavigationState({ isNavigating: true, direction: 'prev' });
    
    setCurrentDate(prev => {
      if (prev.month === 1) {
        return { ...prev, year: prev.year - 1, month: 12 };
      }
      return { ...prev, month: prev.month - 1 };
    });

    setTimeout(() => {
      setNavigationState({ isNavigating: false, direction: null });
    }, 300);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(today);
    setNavigationState({ isNavigating: false, direction: null });
  }, [today]);

  const goToDate = useCallback((date: PersianDate) => {
    setCurrentDate(date);
    setNavigationState({ isNavigating: false, direction: null });
  }, []);

  return {
    currentDate,
    currentMonth,
    navigationState,
    today,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate
  };
};
