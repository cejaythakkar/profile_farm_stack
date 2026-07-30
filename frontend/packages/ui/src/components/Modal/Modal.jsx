import React from 'react';
import ReactModal from 'react-modal';
import { Button } from '../form';
import { FaTimes } from 'react-icons/fa';

ReactModal.setAppElement('#modal-container');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Modern slate overlay with nice transparency
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)', // Soft blur effect on the background behind the modal
  },
  content: {
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    inset: 'unset',

    width: '92%',
    maxWidth: '600px',
    height: '80vh',
    maxHeight: '520px',

    overflow: 'hidden', // Changed to hidden so the card container itself doesn't scroll—only the body does!

    padding: 'unset',
    borderRadius: '12px', // Smoother, modern rounded corners
    border: '1px solid rgb(241, 245, 249)', // Ultra-light elegant border
    background: '#fff',
    boxShadow:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // Rich dropdown shadow
  },
};
const Modal = ({
  children,
  isOpen,
  setIsOpen,
  title = 'Update Project',
  submitButtonTitle = 'Save Changes',
  isSubmitButtonDisabled = false,
  showCancelButton = true,
  submitHandler = () => {},
}) => {
  console.log('isSubmitButtonDisabled', isSubmitButtonDisabled)
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      {/* Fixed: explicitly added "flex flex-col" to lock the 10%/80%/10% grid proportions */}
      <div className="modal-container flex flex-col h-full bg-white">
        {/* --- EYE-CATCHING MODAL HEADER --- */}
        <div className="modal-header flex justify-between items-center px-5 h-[10%] bg-slate-50 border-b border-slate-100 rounded-t-xl">
          <div className="flex items-center gap-x-2">
            {/* Visual accent dot indicator */}
            {/* <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span> */}
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
              {title}
            </h2>
          </div>

          {/* Circular, interactive close button button */}
          <button
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-all duration-200 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* --- SCROLLABLE BODY CONTENT --- */}
        <div className="modal-content bg-gray-900 flex-1 overflow-auto text-slate-600 text-sm leading-relaxed">
          {children}
        </div>

        {/* --- CLEAN MODAL FOOTER --- */}
        <div className="modal-footer px-5 h-[10%] flex items-center justify-end gap-x-3 bg-slate-50 border-t border-slate-100 rounded-b-xl">
          {showCancelButton && (
            <Button
              text={'Cancel'}
              clickHandler={() => setIsOpen(false)}
              color="red"
            />
          )}
          <Button
            text={submitButtonTitle}
            clickHandler={submitHandler}
            disabled={isSubmitButtonDisabled}
            color="blue"
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
