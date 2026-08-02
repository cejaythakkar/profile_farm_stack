import { useRef } from 'react';
import { Modal } from 'shared-component-library';
import DynamicForm from '../../components/DynamicForm';
import { useFormikContext } from 'formik';
import * as yup from 'yup';
import { FormComponents } from 'shared-component-library';
import axiosClient from '../../utils/axiosClient';
import { FormSpinner } from 'shared-component-library';
import { useSelector, useDispatch } from 'react-redux';
import { setFormSubmit } from '../../store/uiSlice';
import { fetchExperience } from '../../store/experienceSlice';
import { toast } from 'react-toastify';

const Form = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <>
      <div className="h-full flex flex-col  -mx-3 my-3">
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="company"
            text="company"
            type={'text'}
            placeholder="Enter Company Name"
            required
          />
        </div>
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="position"
            text="position"
            type={'text'}
            placeholder="Enter Current Position in the Company"
            required
          />
        </div>
        <div class="flex flex-col md:flex-row gap-3 w-full mb-3">
          <div className="w-full md:w-1/2 px-3  md:mb-0">
            <FormComponents.Input
              name="fromDate"
              text="From"
              type="text"
              placeholder="Joining month-year (ex. feb-2020)"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3  md:mb-0">
            <FormComponents.Input
              name="toDate"
              text="To"
              type={'text'}
              placeholder="Relieving month-year (ex. feb-2020)"
            />
          </div>
        </div>
        <div className="w-full px-3 mb-3  flex-1 flex flex-col">
          <FormComponents.FormikRichTextEditor
            name="roles_responsibilities"
            text="Roles & Responsibilities"
            defaultValue={values.roles_responsibilities}
          />
        </div>
      </div>
    </>
  );
};
const AddUpdateExperienceForm = ({
  isModalOpen,
  modelTitle,
  setIsModalOpen,
  editMode = false,
}) => {
  const formRef = useRef(null);
  const formSubmit = useSelector((state) => state.ui.formSubmit);
  const expData = useSelector((state) => state.experience.selectedExperience);
  let defaultFormState = {
    company: '',
    position: '',
    fromDate: '',
    toDate: '',
    roles_responsibilities: '',
  };
  if (editMode) defaultFormState = expData;
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isModalOpen}
      title={modelTitle}
      setIsOpen={setIsModalOpen}
      submitButtonTitle={editMode ? 'Update' : 'Add'}
      submitHandler={() => formRef.current?.handleSubmit()}
    >
      {' '}
      {formSubmit && <FormSpinner />}
      <DynamicForm
        innerRef={formRef}
        initialValues={defaultFormState}
        validationSchema={yup.object().shape({})}
        submitHandler={async (values) => {
          // 
          let success = false;
          let successMessage = editMode
            ? 'Experience Updated Successfully'
            : 'Experience Added Successfully!';
          dispatch(setFormSubmit(true));
          try {
            editMode
              ? await axiosClient.put(`/experience/${values.id}`, values)
              : await axiosClient.post('/experience', values);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            success = true;
          } catch (e) {
            ;
          } finally {
            dispatch(setFormSubmit(false));
            dispatch(fetchExperience());
            setIsModalOpen(false);
            success
              ? toast.success(successMessage)
              : toast.error(
                  'Something went Wrong while updating... Please Try Again.',
                );
          }
        }}
        widthFull
        showActionButtons={false}
      >
        <Form />
      </DynamicForm>
    </Modal>
  );
};

export default AddUpdateExperienceForm;
