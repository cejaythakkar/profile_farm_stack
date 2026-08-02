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
import { fetchProjects } from '../../store/projectsSlice';
import { toast } from 'react-toastify';

const Form = () => {
  const { values, setFieldValue } = useFormikContext();
  
  const usersCompanies = useSelector((state) => state.projects.usersCompanies);
  const personalProject = values?.isPersonal;
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
              <FormComponents.SelectBox
                name="company"
                text="Company"
                options={usersCompanies.map((company) => ({
                  label: company.company,
                  value: company['_id'],
                  ...company
                }))}
                value={values.company}
                onChangeHandler={setFieldValue}
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
            defaultValue={values.contributions}
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
  const projectData = useSelector((state) => state.projects.selectedProject);
  const usersCompanies = useSelector((state) => state.projects.usersCompanies);
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
  if (editMode) defaultFormState = projectData;
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isModalOpen}
      title={modelTitle}
      setIsOpen={setIsModalOpen}
      submitButtonTitle={editMode ? 'Update' : 'Add'}
      isSubmitButtonDisabled={usersCompanies.length == 0}
      submitHandler={() => formRef.current?.handleSubmit()}
    >
      {' '}
      {!usersCompanies.length ? (
        <div className="w-full h-full text-white flex items-center justify-center">
          <p className="w-[75%] text-lg border p-4 rounded">
            You can't add a project until you've added at least one experience
            entry.
          </p>
        </div>
      ) : (
        <>
          {formSubmit && <FormSpinner />}
          <DynamicForm
            innerRef={formRef}
            initialValues={defaultFormState}
            validationSchema={yup.object().shape({})}
            submitHandler={async (values) => {
              
              
              let success = false;
              let successMessage = editMode
                ? 'Project Updated Successfully'
                : 'Project Added Successfully!';
              dispatch(setFormSubmit(true));
              try {
                editMode
                  ? await axiosClient.put(`/projects/${values.id}`, values)
                  : await axiosClient.post('/projects', values);
                success = true;
              } catch (e) {
                ;
              } finally {
                dispatch(setFormSubmit(false));
                dispatch(fetchProjects());
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
        </>
      )}
    </Modal>
  );
};

export default AddUpdateProjectForm;
