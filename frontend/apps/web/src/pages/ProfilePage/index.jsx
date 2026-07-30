import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData as getData } from '../../utils/api';
import MobileNavigation from './MobileNavigation';
import Sidebar from './Sidebar';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProfilePageSection from './ProfilePageSection';
import {LoadingScreen} from 'shared-component-library'
import Card from './Card';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'languages', title: 'Languages' },
  { id: 'contact', title: 'Contact' },
  { id: 'social', title: 'Social' },
  { id: 'hobbies', title: 'Hobbies' },
];

const defaultValues = {};

export default function ProfilePage() {
  const { userName } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getData({ url: `/profile/${userName}` });

      setProfile(data);
    }

    if (userName) load();
  }, [userName]);

  if (!profile)
    return (
     <LoadingScreen />
    );

  const { personalDetails, experiences, skills, projects } = profile;

  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroSection personalDetails={personalDetails} userName={userName} />

      <MobileNavigation sections={sections} />

      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-10 py-10">
        {/* SIDEBAR */}

        <Sidebar sections={sections} />

        {/* CONTENT */}

        <main className="sm:px-5 lg:col-span-9 space-y-16 max-w-5xl mx-auto  px-4 box-border">
          {/* ABOUT */}

          <AboutSection personalDetails={personalDetails} />

          {/* PROJECTS */}

          <ProjectsSection projects={projects} />

          {/* EXPERIENCE */}

          <ExperienceSection experiences={experiences} />

          {/* SKILLS */}

          <SkillsSection skills={skills} />

          {/* LANGUAGES */}

          <ProfilePageSection id="languages" sectionTitle={'Languages'}>
            <div className="flex gap-3 flex-wrap">
              {personalDetails.languagesKnown.map((language) => (
                <span
                  key={language.value}
                  className="bg-green-100 px-5 py-2 rounded-full"
                >
                  {language.label}
                </span>
              ))}
            </div>
          </ProfilePageSection>

          {/* CONTACT */}

          <ProfilePageSection id="contact" sectionTitle={'Contact'}>
            {personalDetails.contactDetails.map((contact, i) => (
              <div className="my-3">
                <Card key={i} title={contact.type} value={contact.number} />
              </div>
            ))}
          </ProfilePageSection>

          {/* SOCIAL */}

          <ProfilePageSection id="social" sectionTitle={'Social'}>
            <div className="space-y-4">
              {personalDetails.socialMedia.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600"
                >
                  {social.type}
                </a>
              ))}
            </div>
          </ProfilePageSection>

          {/* HOBBIES */}

          <ProfilePageSection id="hobbies" sectionTitle={'Hobbies'}>
            <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 gap-4">
              {personalDetails.hobbies.map((hobby) => (
                <div
                  key={hobby.value}
                  className="bg-white shadow rounded-xl p-4"
                >
                  {hobby.label}
                </div>
              ))}
            </div>
          </ProfilePageSection>
        </main>
      </div>
    </div>
  );
}
