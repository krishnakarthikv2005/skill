import React from 'react';
import { InheritanceTimeline } from '../components/timeline/InheritanceTimeline';

export const TimelinePage = () => {
  return (
    <div className="space-y-8 animate-fade-in py-4">
      <InheritanceTimeline />
    </div>
  );
};
