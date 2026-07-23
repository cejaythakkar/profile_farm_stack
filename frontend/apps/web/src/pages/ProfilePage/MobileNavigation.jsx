import React from 'react';

const MobileNavigation = ({ sections }) => {
  return (
    <div className="lg:hidden sticky top-0 bg-white z-50 overflow-x-auto whitespace-nowrap shadow">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="inline-block px-4 py-3 text-sm"
        >
          {section.title}
        </a>
      ))}
    </div>
  );
};

export default MobileNavigation;
