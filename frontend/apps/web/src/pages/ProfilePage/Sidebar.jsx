import React from 'react';

const Sidebar = ({ sections }) => {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-10 bg-white rounded-xl shadow p-6 ">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block py-3 hover:text-blue-600"
          >
            {section.title}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
