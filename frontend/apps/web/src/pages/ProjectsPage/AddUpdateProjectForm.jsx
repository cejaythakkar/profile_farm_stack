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
  const personalProject = values.isPersonal;
  return (
    <>
      <div className="h-full flex flex-col  -mx-3 my-3">
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="title"
            text="Project Title"
            type={'text'}
            placeholder="Enter Project Title"
            required
          />
        </div>
        <div class="flex flex-col md:flex-row gap-3 w-full mb-3">
          <div className=" px-3  md:mb-0">
            <FormComponents.CheckBox
              name="isPersonal"
              text={'Is Personal?'}
              type={'checkbox'}
            />
          </div>
          <div className="flex-1 md:w-1/2 px-3  md:mb-0 ">
            {!personalProject && (
              <FormComponents.Input
                name="company"
                text="Company"
                type={'text'}
                required
                placeholder="Please Enter Company"
              />
            )}
          </div>
        </div>

        <div className="w-full px-3 mb-3">
          <FormComponents.ChipInput
            name="domain"
            text="Domain"
            required
            placeholder="Enter Domain"
            value={values.domain}
            setValue={setFieldValue}
          />
        </div>
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="role"
            text="Role"
            type={'text'}
            required
            placeholder="Please Enter Role"
          />
        </div>
        <div className="w-full px-3 mb-3">
          <FormComponents.ChipInput
            name="technology"
            text="Technology"
            value={values.technology}
            setValue={setFieldValue}
          />
        </div>
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="link"
            text="Link"
            type={'text'}
            placeholder="Please Enter Live Link of the Project"
          />
        </div>
        <div className="w-full px-3 mb-3">
          <FormComponents.Input
            name="githubRepo"
            text="Github Repo Link"
            type={'text'}
            placeholder="Please Enter Github Repo Link"
          />
        </div>
        <div className="w-full px-3 mb-3  flex-1 flex flex-col">
          <FormComponents.FormikRichTextEditor
            name="contributions"
            text="Your Contribuion"
            defaultValue={values.roles_responsibilities}
          />
        </div>
      </div>
    </>
  );
};
const AddUpdateProjectForm = ({
  isModalOpen,
  modelTitle,
  setIsModalOpen,
  editMode = false,
}) => {
  const formRef = useRef(null);
  const formSubmit = useSelector((state) => state.ui.formSubmit);
  const expData = useSelector((state) => state.experience.selectedExperience);
  let defaultFormState = {
    title: '',
    isPersonal: false,
    company: '',
    domain: [],
    role: '',
    technology: [],
    link: '',
    githubRepo: '',
    contributions: '',
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
          console.log(values)
          
          let success = false;
          let successMessage = editMode
            ? 'Project Updated Successfully'
            : 'Project Added Successfully!';
          dispatch(setFormSubmit(true));
          try {
            editMode
              ? await axiosClient.put(`/projects/${values.id}`, values)
              : await axiosClient.post('/projects', values);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            success = true;
          } catch (e) {
            console.log('e', e);
          } finally {
            dispatch(setFormSubmit(false));
            // dispatch(fetchExperience());
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

export default AddUpdateProjectForm;
