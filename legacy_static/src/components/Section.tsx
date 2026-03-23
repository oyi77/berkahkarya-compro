import React from 'react';

interface SectionProps {
  variant: 'dark' | 'light' | 'white';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const variantClassMap = {
  dark: 'section-dark',
  light: 'section-light',
  white: 'section-white',
};

export default function Section({ variant, children, className, id }: SectionProps) {
  const sectionClass = [
    variantClassMap[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClass} id={id}>
      <div className="section-inner">{children}</div>
    </section>
  );
}
