import React from 'react';
import ProfilePageSection from './ProfilePageSection';

const SkillsSection = ({ skills }) => {
  return (
    <ProfilePageSection id={'skills'} sectionTitle={'Skills'}>
      <div className="space-y-8">
        {Object.entries(skills.skills).map(([category, list]) => (
          <div key={category}>
            <h3 className="font-semibold text-xl mb-3">{category}</h3>

            <div className="flex flex-wrap gap-3">
              {list.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProfilePageSection>
  );
};

export default SkillsSection;
