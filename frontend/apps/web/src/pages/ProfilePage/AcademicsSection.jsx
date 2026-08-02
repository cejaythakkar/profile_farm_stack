import React from 'react';
import ProfilePageSection from './ProfilePageSection';

const AcademicsSection = ({ academicsData }) => {
  return (
    <ProfilePageSection id={'academics'} sectionTitle={'Academics'}>
      <div class="w-full max-w-5xl mx-auto overflow-hidden rounded border border-border bg-card text-card-foreground shadow-sm">
        <div class="px-6 py-5 border-b border-border bg-muted/40">
          <h3 class="text-lg font-semibold tracking-tight">Academic History</h3>
          <p class="text-sm text-muted-foreground mt-0.5">
            Educational qualifications and institutional details
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/60">
                <th scope="col" class="py-3.5 px-6">
                  Year
                </th>
                <th scope="col" class="py-3.5 px-6">
                  Course / Degree
                </th>
                <th scope="col" class="py-3.5 px-6">
                  Institution
                </th>
                <th scope="col" class="py-3.5 px-6">
                  University / Board
                </th>
                <th scope="col" class="py-3.5 px-6 text-right">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border text-sm">
              {academicsData.map((data) => (
                <tr class="hover:bg-muted/50 transition-colors duration-150">
                  <td class="py-4 px-6 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
                      {data.year}
                    </span>
                  </td>
                  <td class="py-4 px-6 font-medium whitespace-nowrap">
                    {data.course}
                  </td>
                  <td class="py-4 px-6 text-muted-foreground">
                    {data.college}
                  </td>
                  <td class="py-4 px-6 text-muted-foreground">
                    {data.university}
                  </td>
                  <td class="py-4 px-6 text-right whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {data.grades}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProfilePageSection>
  );
};

export default AcademicsSection;
