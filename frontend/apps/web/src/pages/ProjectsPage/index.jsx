import { useEffect, useState, useMemo } from 'react';
import DynamicForm from '../../components/DynamicForm';
import FormSection from '../../components/FormSection';
import { FormSpinner, FormComponents, Modal } from 'shared-component-library';
import { FieldArray } from 'formik';
import * as yup from 'yup';
import ProjectsGrid from './ProjectsGrid';
import AddUpdateProjectForm from './AddUpdateProjectForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/projectsSlice';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModalTitle] = useState('');
  const dispatch = useDispatch();
  const projectsData = useSelector((state) => state.projects.projectsData);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
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
        {/* {dataLoading && <FormSpinner />} */}
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
              <ProjectsGrid />
            </FormSection>
          )}
        </FieldArray>
      </DynamicForm>

      <Modal isOpen={isModalOpen} title={modelTitle} setIsOpen={setIsModalOpen}>
        <AddUpdateProjectForm
          isModalOpen={isModalOpen}
          modelTitle={modelTitle}
          setIsModalOpen={setIsModalOpen}
          editMode={modelTitle == 'Update Project'}
        />
      </Modal>
    </>
  );
};

export default ProjectsPage;
