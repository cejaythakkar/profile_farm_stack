import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData as getData } from '../../utils/api';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'languages', title: 'Languages' },
  { id: 'hobbies', title: 'Hobbies' },
  { id: 'social', title: 'Social' },
  { id: 'contact', title: 'Contact' },
];

const quotes = [
  'Building scalable applications one commit at a time.',
  'Code. Learn. Improve.',
  'Turning ideas into products.',
  'Clean code is a feature.',
];

export default function ProfilePage() {
  const { userName } = useParams();

  const [profile, setProfile] = useState(null);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    async function load() {
      const data = await getData({ url: `/profile/${userName}` });

      setProfile(data);
    }

    if (userName) load();
  }, [userName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!profile) return <div>Loading...</div>;

  const { personalDetails, experiences, skills } = profile;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO */}

      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto py-16 text-center">
          <img
            src={personalDetails.profileImage}
            className="w-40 h-40 rounded-full object-cover border-4 border-white mx-auto shadow-xl"
          />

          <h1 className="text-5xl font-bold mt-6">{personalDetails.name}</h1>

          <p className="text-xl mt-3 text-slate-300">
            Senior Full Stack Developer
          </p>

          <p className="italic mt-6 text-lg">"{quote}"</p>

          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <span>{personalDetails.email}</span>

            <span>{personalDetails.nationality}</span>

            <span>Ahmedabad</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10 py-10">
        {/* SIDEBAR */}

        <aside className="col-span-3">
          <div className="sticky top-10 bg-white rounded-xl shadow p-6">
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

        {/* CONTENT */}

        <main className="col-span-9 space-y-16">
          {/* ABOUT */}

          <section id="about">
            <h2 className="text-3xl font-bold mb-6">About</h2>

            <div className="grid grid-cols-2 gap-6">
              <Card title="Nationality" value={personalDetails.nationality} />
              <Card title="Email" value={personalDetails.email} />
              <Card title="Birthday" value={personalDetails.dob_string} />
              <Card title="Address" value={personalDetails.address} />
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

          {/* EXPERIENCE */}

          <section id="experience">
            <h2 className="text-3xl font-bold mb-8">Experience</h2>

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold">{exp.position}</h3>

                  <p className="text-slate-600 mb-4">{exp.company}</p>

                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: exp.roles_responsibilities,
                    }}
                  />
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

          {/* CONTACT */}

          <section id="contact" className="flex-col">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>

            {personalDetails.contactDetails.map((contact, i) => (
              <div className="my-3">
                <Card key={i} title={contact.type} value={contact.number} />
              </div>
            ))}
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
