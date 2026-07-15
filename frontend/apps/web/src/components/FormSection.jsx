const AuxButtons = ({remove,push,addButtonText}) =>
    remove && push ? (
      <div className="flex gap-x-4">
        <button
          type="button"
          onClick={() => push({ type: '', number: '' })}
          className="transition-all duration-200 rounded border border-blue-600 px-4 py-1.5 text-sm font-medium bg-blue-700 text-white hover:bg-white hover:text-blue-700 hover:ring-2 hover:ring-blue-600"
        >
          {addButtonText}
        </button>
      </div>
    ) : (
      <></>
    );

const FormSection = ({ children, title, remove, push, addButtonText = ''}) => {
  
  
  return (
    <div className={`flex-wrap mb-6`}>
      <div className="flex gap-x-4 pb-2 border-b border-gray-500">
        <h1 className="text-3xl text-gray-500">{title}</h1>
        <div className="flex gap-x-4">
          <AuxButtons addButtonText={addButtonText} remove={remove} push={push} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default FormSection;
