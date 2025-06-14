import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  overlay = false,
  fullScreen = false
}) => {
  const spinnerClass = `loading-spinner loading-${size}`;
  const containerClass = fullScreen 
    ? 'loading-container loading-fullscreen'
    : overlay 
    ? 'loading-container loading-overlay'
    : 'loading-container';

  return (
    <div className={containerClass}>
      <div className="loading-content">
        <div className={spinnerClass}>
          <div className="spinner"></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

// Simple spinner component for inline usage
export const Spinner: React.FC<{
  size?: LoadingProps['size'];
}> = ({ size = 'small' }) => {
  return (
    <div className={`loading-spinner loading-${size}`}>
      <div className="spinner"></div>
    </div>
  );
};

// Loading skeleton for calendar days
export const CalendarDaySkeleton: React.FC = () => {
  return (
    <div className="calendar-day-skeleton">
      <div className="skeleton-day-number"></div>
      <div className="skeleton-events">
        <div className="skeleton-event"></div>
        <div className="skeleton-event"></div>
      </div>
    </div>
  );
};

// Loading skeleton for event list
export const EventListSkeleton: React.FC<{
  count?: number;
}> = ({ count = 3 }) => {
  return (
    <div className="event-list-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-event-item">
          <div className="skeleton-event-header">
            <div className="skeleton-event-title"></div>
            <div className="skeleton-event-actions"></div>
          </div>
          <div className="skeleton-event-meta">
            <div className="skeleton-event-type"></div>
            <div className="skeleton-event-time"></div>
          </div>
          <div className="skeleton-event-description"></div>
        </div>
      ))}
    </div>
  );
};
