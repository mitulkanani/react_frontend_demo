import React, { ReactNode } from 'react';

const Container = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`mx-auto max-w-md w-full px-2 sm:px-2 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
