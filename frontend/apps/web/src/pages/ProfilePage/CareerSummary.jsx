import React from 'react';
import ProfilePageSection from './ProfilePageSection';
import Card from './Card';
import { getDateString } from '../../utils/dateTime';

const CareerSummary = ({ summary }) => {
  return (
    <ProfilePageSection id={'summary'} sectionTitle={'Career Summary'}>
      <div
        className="prose max-w-none space-y-6"
        dangerouslySetInnerHTML={{
          __html: summary,
        }}
      />
    </ProfilePageSection>
  );
};

export default CareerSummary;
