import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData as getData } from '../../utils/api';
import MobileNavigation from './MobileNavigation';
import Sidebar from './Sidebar';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';

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

  if (!profile) return <div>Loading...</div>;

  const { personalDetails, experiences, skills, projects } = profile;

  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroSection personalDetails={personalDetails} />

      <MobileNavigation sections={sections} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10 py-10">
        {/* SIDEBAR */}

        <Sidebar sections={sections} />

        {/* CONTENT */}

        <main className="sm:px-5 col-span-12 lg:col-span-9 space-y-16 max-w-5xl mx-auto w-full">
          {/* ABOUT */}

          <AboutSection personalDetails={personalDetails} />

          {/* PROJECTS */}

          <ProjectsSection projects={projects} />

          {/* EXPERIENCE */}

          <section id="experience">
            <h2 className="text-3xl font-bold mb-8">Experience</h2>

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
          </section>

          {/* SKILLS */}

          <section id="skills">
            <h2 className="text-3xl font-bold mb-8">Skills</h2>

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
          </section>

          {/* LANGUAGES */}

          <section id="languages">
            <h2 className="text-3xl font-bold mb-6">Languages</h2>

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
          </section>

          {/* CONTACT */}

          <section id="contact" className="flex-col">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>

            {personalDetails.contactDetails.map((contact, i) => (
              <div className="my-3">
                <Card key={i} title={contact.type} value={contact.number} />
              </div>
            ))}
          </section>

          {/* SOCIAL */}

          <section id="social">
            <h2 className="text-3xl font-bold mb-6">Social</h2>

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
          </section>

          {/* HOBBIES */}

          <section id="hobbies">
            <h2 className="text-3xl font-bold mb-6">Hobbies</h2>

            <div className="grid grid-cols-3 gap-4">
              {personalDetails.hobbies.map((hobby) => (
                <div
                  key={hobby.value}
                  className="bg-white shadow rounded-xl p-4"
                >
                  {hobby.label}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="text-slate-500 text-sm">{title}</div>

      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}
