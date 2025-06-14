import React from 'react';
import { Button, IconButton } from '../Shared';
import { PersianCalendar } from '../../utils/PersianCalendar';

interface CalendarNavigationProps {
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
  onTodayClick: () => void;
  showYearSelector?: boolean;
  showMonthSelector?: boolean;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  year,
  month,
  onMonthChange,
  onTodayClick,
  showYearSelector = true,
  showMonthSelector = true
}) => {
  const persianCalendar = new PersianCalendar();
  const monthNames = persianCalendar.getMonthNames();
  const currentMonth = persianCalendar.getMonthName(month);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (month === 1) {
      onMonthChange(year - 1, 12);
    } else {
      onMonthChange(year, month - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (month === 12) {
      onMonthChange(year + 1, 1);
    } else {
      onMonthChange(year, month + 1);
    }
  };

  // Handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    onMonthChange(newYear, month);
  };

  // Handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value);
    onMonthChange(year, newMonth);
  };

  // Generate year options (current year ± 10 years)
  const yearOptions = Array.from({ length: 21 }, (_, i) => year - 10 + i);

  return (
    <div className="calendar-navigation">
      <div className="calendar-nav-section calendar-nav-controls">
        {/* Previous month button */}
        <IconButton
          icon="◀"
          onClick={goToPreviousMonth}
          title="ماه قبل"
          size="medium"
          variant="outline"
        />

        {/* Month and year display/selectors */}
        <div className="calendar-nav-date">
          {showMonthSelector ? (
            <select
              value={month}
              onChange={handleMonthChange}
              className="calendar-select calendar-month-select"
            >
              {monthNames.map((monthName, index) => (
                <option key={index + 1} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
          ) : (
            <span className="calendar-month-display">{currentMonth}</span>
          )}

          {showYearSelector ? (
            <select
              value={year}
              onChange={handleYearChange}
              className="calendar-select calendar-year-select"
            >
              {yearOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          ) : (
            <span className="calendar-year-display">{year}</span>
          )}
        </div>

        {/* Next month button */}
        <IconButton
          icon="▶"
          onClick={goToNextMonth}
          title="ماه بعد"
          size="medium"
          variant="outline"
        />
      </div>

      <div className="calendar-nav-section calendar-nav-actions">
        {/* Today button */}
        <Button
          variant="primary"
          size="medium"
          onClick={onTodayClick}
          icon="📅"
          iconPosition="left"
        >
          امروز
        </Button>

        {/* Quick navigation buttons */}
        <div className="calendar-quick-nav">
          <IconButton
            icon="⏪"
            onClick={() => onMonthChange(year - 1, month)}
            title="سال قبل"
            size="small"
            variant="secondary"
          />
          <IconButton
            icon="⏩"
            onClick={() => onMonthChange(year + 1, month)}
            title="سال بعد"
            size="small"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
};

// Compact navigation component for mobile or small spaces
export const CalendarNavigationCompact: React.FC<CalendarNavigationProps> = ({
  year,
  month,
  onMonthChange,
  onTodayClick
}) => {
  const persianCalendar = new PersianCalendar();
  const currentMonth = persianCalendar.getMonthName(month);

  const goToPreviousMonth = () => {
    if (month === 1) {
      onMonthChange(year - 1, 12);
    } else {
      onMonthChange(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      onMonthChange(year + 1, 1);
    } else {
      onMonthChange(year, month + 1);
    }
  };

  return (
    <div className="calendar-navigation-compact">
      <IconButton
        icon="◀"
        onClick={goToPreviousMonth}
        title="ماه قبل"
        size="small"
      />
      
      <div className="calendar-nav-date-compact">
        <span className="calendar-current-month">{currentMonth}</span>
        <span className="calendar-current-year">{year}</span>
      </div>
      
      <IconButton
        icon="▶"
        onClick={goToNextMonth}
        title="ماه بعد"
        size="small"
      />
      
      <Button
        variant="primary"
        size="small"
        onClick={onTodayClick}
        className="calendar-today-btn-compact"
      >
        امروز
      </Button>
    </div>
  );
};
