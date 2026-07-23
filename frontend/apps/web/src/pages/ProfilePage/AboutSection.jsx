import React from 'react';
import ProfilePageSection from './ProfilePageSection';
import Card from './Card';
import { getDateString } from '../../utils/dateTime';

const AboutSection = ({ personalDetails }) => {
  return (
    <ProfilePageSection id={'about'} sectionTitle={'About'}>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-6">
        <Card title="Nationality" value={personalDetails.nationality} />

        <Card title="Email" value={personalDetails.email} />

        <Card title="Birthday" value={getDateString({dateString: personalDetails.dob, format:'DD-MM-YYYY'})} />

        <Card title="Address" value={personalDetails.address} />
      </div>
    </ProfilePageSection>
  );
};

export default AboutSection;
