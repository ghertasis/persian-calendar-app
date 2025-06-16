import { useState, useCallback } from 'react';

export interface NavigationState {
  currentDate: Date;
  selectedDate: Date;
  isNavigating: boolean;
}

export const useCalendar = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentDate: new Date(),
    selectedDate: new Date(),
    isNavigating: false
  });

  const navigateToMonth = useCallback((direction: 'next' | 'previous') => {
    setNavigationState(prev => ({
      ...prev,
      isNavigating: true,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() + (direction === 'next' ? 1 : -1),
        1
      )
    }));

    // Reset navigation state after animation
    setTimeout(() => {
      setNavigationState(prev => ({
        ...prev,
        isNavigating: false
      }));
    }, 300);
  }, []);

  const selectDate = useCallback((date: Date) => {
    setNavigationState(prev => ({
      ...prev,
      selectedDate: date
    }));
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setNavigationState({
      currentDate: new Date(today.getFullYear(), today.getMonth(), 1),
      selectedDate: today,
      isNavigating: false
    });
  }, []);

  return {
    navigationState,
    navigateToMonth,
    selectDate,
    goToToday
  };
};
