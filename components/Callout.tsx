// components/Callout.tsx
import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning';
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  return (
    <div className={`p-6 my-8 border-l-4 rounded-r-xl ${
      type === 'warning' 
        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950' 
        : 'border-blue-500 bg-blue-50 dark:bg-blue-950'
    }`}>
      {children}
    </div>
  );
}