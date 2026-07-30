import React from 'react';
import ProfilePageSection from './ProfilePageSection';

const ProjectsSection = ({ projects }) => {
  return (
    <ProfilePageSection id={'projects'} sectionTitle={'Projects'}>
      <div className="space-y-10">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
          >
            {/* Header */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold break-words">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm md:text-base text-blue-100">
                    {project.role}
                  </p>
                </div>

                <div className="flex md:justify-end">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                      project.isPersonal ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                  >
                    {project.isPersonal ? 'Personal Project' : project.company.company}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="p-5 md:p-6 space-y-8">
              {/* Technologies */}

              <div>
                <h4 className="font-semibold text-base md:text-lg mb-3">
                  Technologies
                </h4>

                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech) => (
                    <span
                      key={tech.value}
                      className="
                    bg-slate-100
                    text-slate-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    md:text-sm
                  "
                    >
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Domain */}

              <div>
                <h4 className="font-semibold text-base md:text-lg mb-3">
                  Domain
                </h4>

                <div className="flex flex-wrap gap-2">
                  {project.domain.map((item) => (
                    <span
                      key={item.value}
                      className="
                    bg-indigo-100
                    text-indigo-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    md:text-sm
                  "
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}

              {(project.link || project.githubRepo) && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="
                    inline-flex
                    items-center
                    text-blue-600
                    hover:text-blue-700
                    font-medium
                    hover:underline
                  "
                    >
                      🌐 Live Demo
                    </a>
                  )}

                  {project.githubRepo && (
                    <a
                      href={project.githubRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                    inline-flex
                    items-center
                    text-slate-700
                    hover:text-black
                    font-medium
                    hover:underline
                  "
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              )}

              {/* Contribution */}

              <div>
                <h4 className="font-semibold text-lg mb-4">My Contributions</h4>

                <div
                  className="
                prose
                prose-sm
                md:prose-base
                prose-slate
                max-w-none

                prose-headings:text-slate-900
                prose-strong:text-slate-900

                prose-ul:list-disc
                prose-ul:pl-5

                prose-li:marker:text-blue-600

                prose-p:leading-7
              "
                  dangerouslySetInnerHTML={{
                    __html: project.contributions,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfilePageSection>
  );
};

export default ProjectsSection;
