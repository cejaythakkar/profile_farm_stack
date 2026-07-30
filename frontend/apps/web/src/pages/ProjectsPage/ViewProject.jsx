import { Modal } from 'shared-component-library';
import { useSelector } from 'react-redux';

const Form = () => {
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject,
  );

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl px-6 py-6 overflow-y-auto max-w-5xl mx-auto shadow-xl text-white">
      {/* Header */}
      <div className="w-full pb-4 mb-6 border-b border-slate-800 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
          Project
        </span>

        <h2 className="text-2xl font-extrabold tracking-tight">
          {selectedProject.title || 'Untitled Project'}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-400">
            {selectedProject.role || 'Role Not Specified'}
          </span>

          {!selectedProject.isPersonal && (
            <>
              <span className="text-slate-600">•</span>

              <span className="font-medium text-slate-300">
                {selectedProject.company.company}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Domains */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-lg p-4">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Domain
          </span>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedProject.domain?.length ? (
              selectedProject.domain.map((item) => (
                <span
                  key={item.value}
                  className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs"
                >
                  {item.label}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm">Not Specified</span>
            )}
          </div>
        </div>

        {/* Technology */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-lg p-4">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Technology
          </span>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedProject.technology?.length ? (
              selectedProject.technology.map((item) => (
                <span
                  key={item.value}
                  className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs"
                >
                  {item.label}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm">Not Specified</span>
            )}
          </div>
        </div>
      </div>

      {/* Links */}
      {(selectedProject.link || selectedProject.githubRepo) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {selectedProject.link && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Live Project
              </span>

              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="block mt-2 text-cyan-400 hover:text-cyan-300 break-all"
              >
                {selectedProject.link}
              </a>
            </div>
          )}

          {selectedProject.githubRepo && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                GitHub Repository
              </span>

              <a
                href={selectedProject.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="block mt-2 text-cyan-400 hover:text-cyan-300 break-all"
              >
                {selectedProject.githubRepo}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Contribution */}
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-400">
          Contribution
        </span>

        <div
          className="richTextContent p-5 bg-slate-800/20 border border-slate-800 rounded-lg text-sm leading-relaxed text-slate-300 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: selectedProject.contributions,
          }}
        />
      </div>
    </div>
  );
};

const ViewProject = ({ isModalOpen, modelTitle, setIsModalOpen }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      title={modelTitle}
      setIsOpen={setIsModalOpen}
      submitButtonTitle="Ok"
      showCancelButton={false}
      submitHandler={() => setIsModalOpen(false)}
    >
      <Form />
    </Modal>
  );
};

export default ViewProject;
