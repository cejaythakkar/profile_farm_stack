import React from 'react';
import Card from './Card';

const AboutSection = ({ personalDetails }) => {
  return (
    <section id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About</h2>

        <div className="grid grid-cols-2 gap-6">
          <Card title="Nationality" value={personalDetails.nationality} />
          <Card title="Email" value={personalDetails.email} />
          <Card title="Birthday" value={personalDetails.dob_string} />
          <Card title="Address" value={personalDetails.address} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
