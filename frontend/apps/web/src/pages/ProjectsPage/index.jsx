import { useEffect, useState, useMemo } from 'react';
import DynamicForm from '../../components/DynamicForm';
import FormSection from '../../components/FormSection';
import { FormSpinner, FormComponents, Modal } from 'shared-component-library';
import { FieldArray } from 'formik';
import * as yup from 'yup';
import ProjectsGrid from './ProjectsGrid';
import AddUpdateProjectForm from './AddUpdateProjectForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, fetchUsersCompanies } from '../../store/projectsSlice';
import ViewProject from './ViewProject';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModalTitle] = useState('');
  const dispatch = useDispatch();
  const projectsData = useSelector((state) => state.projects.projectsData);
  const usersCompanies = useSelector((state) => state.projects.usersCompanies);
  const dataLoading = useSelector((state) => state.ui.dataLoading);
  useEffect(() => {
    dispatch(fetchUsersCompanies());
  }, [dispatch]);
  useEffect(() => {
    if (usersCompanies.length) dispatch(fetchProjects());
  }, [dispatch, usersCompanies]);
  const handleViewClick = (rowData, name) => {
    switch (name) {
      case 'view':
        setModalTitle('View Project');
        break;
      case 'update':
        setModalTitle('Update Project');
        break;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <DynamicForm
        initialValues={projectsData}
        showActionButtons={false}
        validationSchema={yup.object().shape({})}
      >
        {dataLoading && <FormSpinner />}
        <FieldArray name="projects">
          {({ remove, push }) => (
            <FormSection
              title={'Projects'}
              push={() => {
                // push({ skillGroupTitle: '', skills: [] });
                setModalTitle('Add Project');
                setIsModalOpen(true);
              }}
              addButtonText="Add Project"
            >
              <ProjectsGrid actionButtonClickHandler={handleViewClick} />
            </FormSection>
          )}
        </FieldArray>
      </DynamicForm>
      {modelTitle == 'View Project' && (
        <ViewProject
          isModalOpen={isModalOpen}
          modelTitle={modelTitle}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {modelTitle != 'View Project' && (
        <Modal
          isOpen={isModalOpen}
          title={modelTitle}
          setIsOpen={setIsModalOpen}
        >
          <AddUpdateProjectForm
            isModalOpen={isModalOpen}
            modelTitle={modelTitle}
            setIsModalOpen={setIsModalOpen}
            editMode={modelTitle == 'Update Project'}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectsPage;
