import { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { FormComponents } from 'shared-component-library';
import { DataGrid } from '@mui/x-data-grid';
import GridStyles from './GridStyle';
import { useDispatch } from 'react-redux';
import { deleteProject, setSelectedProject } from '../../store/projectsSlice';

const ProjectsGrid = ({ actionButtonClickHandler }) => {
  const { values, setFieldValue, handleChange } = useFormikContext();
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'TITLE',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          console.log(
            'values.projects[formikIndex]?.title',
            values.projects[formikIndex]?.title,
          );
          return <span>{values.projects[formikIndex]?.title || ''}</span>;
        },
      },
      {
        field: 'isPersonal',
        headerName: 'IS PERSONAL?',
        width: 125,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;

          return (
            <span>
              {values.projects[formikIndex]?.isPersonal ? 'YES' : 'NO'}
            </span>
          );
        },
      },
      {
        field: 'company',
        headerName: 'COMPANY',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;

          return <span>{values.projects[formikIndex]?.company?.company || '-'}</span>;
        },
      },
      {
        field: 'domain',
        headerName: 'DOMAIN',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          const domainArray = values.projects[formikIndex]?.domain;
          return (
            <div className="w-full h-full flex flex-wrap gap-1 p-0.5">
              {domainArray.map((domain) => (
                <span className="p-1 border rounded h-[30px] flex items-center">
                  {domain.value}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        field: 'role',
        headerName: 'ROLE',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          return <span>{values.projects[formikIndex]?.role || ''}</span>;
        },
      },
      {
        field: 'technology',
        headerName: 'TECH',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          const techArray = values.projects[formikIndex]?.technology;
          return (
            <div className="w-full h-full flex flex-wrap gap-1 p-0.5">
              {techArray.map((tech) => (
                <span className="p-1 border rounded h-[30px] flex items-center">
                  {tech.value}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        field: 'link',
        headerName: 'LINK',
        width: 150,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;

          const project_link = values.projects[formikIndex]?.link;
          return project_link ? (
            <a
              href={project_link}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Project Link
            </a>
          ) : (
            <span>-</span>
          );
        },
      },
      {
        field: 'github_repo',
        headerName: 'GITHUB REPO',
        width: 150,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.projects.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          const repo = values.projects[formikIndex]?.githubRepo;
          return repo ? (
            <a
              href={repo}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Github Repo
            </a>
          ) : (
            <span>-</span>
          );
        },
      },
      {
        field: 'view',
        headerName: 'VIEW',
        width: 70,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <FormComponents.Button
              text={'view'}
              color="green"
              name="view"
              iconName="view"
              clickHandler={(e) => {
                actionButtonClickHandler(params.row, 'view');
                dispatch(setSelectedProject(params.row));
              }}
            />
          );
        },
      },
      {
        field: 'update',
        headerName: 'UPDATE',
        width: 70,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <FormComponents.Button
              text={'update'}
              color="blue"
              name="update"
              iconName="edit"
              clickHandler={() => {
                const formikIndex = values.projects.findIndex(
                  (item) => item.id === params.row.id,
                );
                ;
                if (formikIndex !== -1) {
                  actionButtonClickHandler(params.row, 'update');
                  dispatch(setSelectedProject(params.row));
                }
              }}
            />
          );
        },
      },
      {
        field: 'delete',
        headerName: 'DELETE',
        width: 70,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <FormComponents.Button
              text={'delete'}
              color="red"
              name="delete"
              iconName="delete"
              clickHandler={() => {
                
                dispatch(deleteProject({ projectId: params.row.id }));
              }}
            />
          );
        },
      },
    ],
    [values.projects, handleChange, setFieldValue],
  );
  return (
    <DataGrid
      rows={values.projects}
      columns={columns}
      pageSizeOptions={[5]}
      rowHeight={70}
      sx={GridStyles}
    />
  );
};

export default ProjectsGrid;
