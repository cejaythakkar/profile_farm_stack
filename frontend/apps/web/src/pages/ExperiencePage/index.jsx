import { useEffect, useState } from 'react';
import DynamicForm from '../../components/DynamicForm';
import FormSection from '../../components/FormSection';
import { FormSpinner } from 'shared-component-library';
import { FieldArray } from 'formik';
import * as yup from 'yup';
import AddUpdateExperienceForm from './AddUpdateExperienceForm';
import ViewExperience from './ViewExperience';
import { useSelector, useDispatch } from 'react-redux';
import ExperienceGrid from './ExperienceGrid';
import { fetchExperience } from '../../store/experienceSlice';

const ExperiencePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModalTitle] = useState('');
  const dispatch = useDispatch();
  const dataLoading = useSelector((state) => state.ui.dataLoading);
  const experienceData = useSelector(
    (state) => state.experience.experienceData,
  );

  useEffect(() => {
    dispatch(fetchExperience())
  },[dispatch]);

  const actionButtonClickHandler = (rowData, name) => {
    switch (name) {
      case 'view':
        setModalTitle('View Experience');
        break;
      case 'update':
        setModalTitle('Update Experience');
        break;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <DynamicForm
        initialValues={experienceData}
        showActionButtons={false}
        validationSchema={yup.object().shape({})}
      >
        {dataLoading && <FormSpinner />}
        <FieldArray name="experiences">
          {({ remove, push }) => (
            <FormSection
              title={'Experience'}
              push={() => {
                // push({ skillGroupTitle: '', skills: [] });
                setModalTitle('Add Experience');
                setIsModalOpen(true);
              }}
              addButtonText="Add Experience"
            >
              <ExperienceGrid
                remove={remove}
                actionButtonClickHandler={actionButtonClickHandler}
              />
            </FormSection>
          )}
        </FieldArray>
      </DynamicForm>
      {modelTitle == 'View Experience' && (
        <ViewExperience
          isModalOpen={isModalOpen}
          modelTitle={modelTitle}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {modelTitle != 'View Experience' && (
        <AddUpdateExperienceForm
          isModalOpen={isModalOpen}
          modelTitle={modelTitle}
          setIsModalOpen={setIsModalOpen}
          editMode={modelTitle=='Update Experience'}
        />
      )}
    </>
  );
};

export default ExperiencePage;
