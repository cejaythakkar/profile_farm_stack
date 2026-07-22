import { Modal } from 'shared-component-library';
import { useSelector } from 'react-redux';
const Form = () => {
  const selectedExperience = useSelector(
    (state) => state.experience.selectedExperience,
  );
  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl px-6 py-6 overflow-y-auto max-w-4xl mx-auto shadow-xl text-white">
      {/* Header Profile Section */}
      <div className="w-full pb-4 mb-6 border-b border-slate-800 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
          Current Position
        </span>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {selectedExperience.position || 'Not Specified'}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium text-slate-400">at</span>
          <span className="text-base font-semibold text-slate-200">
            {selectedExperience.company || 'Not Specified'}
          </span>
        </div>
      </div>

      {/* Grid Timeline Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-slate-800/40 p-4 border border-slate-800/80 rounded-lg flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
            Start Date
          </span>
          <span className="text-base font-semibold text-white">
            {selectedExperience.fromDate || 'N/A'}
          </span>
        </div>
        
        <div className="bg-slate-800/40 p-4 border border-slate-800/80 rounded-lg flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
            End Date
          </span>
          <span className="text-base font-semibold text-white">
            {selectedExperience.toDate || 'Present'}
          </span>
        </div>
      </div>

      {/* Rich Text Rich Content Block */}
      <div className="w-full flex-1 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
          Roles & Responsibilities
        </span>
        <div 
          className="richTextContent p-4 bg-slate-800/20 border border-slate-800/60 rounded-lg text-sm leading-relaxed text-slate-300 font-normal prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: selectedExperience.roles_responsibilities }}
        />
      </div>
    </div>
  );
};

const ViewExperience = ({ isModalOpen, modelTitle, setIsModalOpen }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      title={modelTitle}
      setIsOpen={setIsModalOpen}
      submitButtonTitle="Ok"
      showCancelButton={false}
      submitHandler={() => setIsModalOpen(false)}
    ><Form /></Modal>
  );
};

export default ViewExperience;
