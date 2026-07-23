import React from 'react';
import ProfilePageSection from './ProfilePageSection';

const ExperienceSection = ({ experiences }) => {
  return (
    <ProfilePageSection id={'experience'} sectionTitle={'Experience'}>
      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-xl shadow">
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white rounded-t-xl p-6">
              <h3 className="text-2xl font-bold">{exp.position}</h3>

              <p className="text-green-100 text-xl my-2">{exp.company}</p>

              <span className="italic text-green-200">
                {exp.fromDate} - {exp.toDate || 'Present'}
              </span>
            </div>

            <div
              className="prose max-w-none p-6 space-y-6"
              dangerouslySetInnerHTML={{
                __html: exp.roles_responsibilities,
              }}
            />
          </div>
        ))}
      </div>
    </ProfilePageSection>
  );
};

export default ExperienceSection;
