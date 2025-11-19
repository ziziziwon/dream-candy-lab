import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

export default function Container({ children, className = '', maxWidth = 'xl' }: Props) {
  const widthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${widthClasses[maxWidth]} mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}





