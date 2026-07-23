import { useMemo } from 'react';
import { FormComponents } from 'shared-component-library';
import { useFormikContext } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import GridStyle from '../ProjectsPage/GridStyle';
import { useDispatch } from 'react-redux';
import {
  deleteExperience,
  setSelectedExperience,
} from '../../store/experienceSlice';

const ExperienceGrid = ({ remove, actionButtonClickHandler }) => {
  const { values, setFieldValue, handleChange } = useFormikContext();
  const dispatch = useDispatch();

  // 1. Map rows first so that columns useMemo has safe access to mappedRows lengths

  // 2. Build columns using the stable mappedRows layout index
  const columns = useMemo(
    () => [
      {
        field: 'company',
        headerName: 'COMPANY',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.experiences.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          return <span>{values.experiences[formikIndex]?.company || ''}</span>;
        },
      },
      {
        field: 'position',
        headerName: 'POSITION',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.experiences.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;

          return <span>{values.experiences[formikIndex]?.position || ''}</span>;
        },
      },
      {
        field: 'fromDate',
        headerName: 'FROM',
        width: 150,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.experiences.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;
          return <span>{values.experiences[formikIndex]?.fromDate}</span>;
        },
      },
      {
        field: 'toDate',
        headerName: 'TO',
        width: 150,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = values.experiences.findIndex(
            (item) => item.id === params.row.id,
          );
          if (formikIndex === -1) return null;

          return (
            <span>{values.experiences[formikIndex]?.toDate || 'Present'}</span>
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
                dispatch(setSelectedExperience(params.row));
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
                const formikIndex = values.experiences.findIndex(
                  (item) => item.id === params.row.id,
                );

                if (formikIndex !== -1) {
                  actionButtonClickHandler(params.row, 'update');
                  dispatch(setSelectedExperience(params.row));
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
                dispatch(deleteExperience({ expId: params.row.id }));
              }}
            />
          );
        },
      },
    ],
    [values.experiences, handleChange, setFieldValue, remove],
  );

  return (
    <div>
      <DataGrid
        rows={values.experiences}
        columns={columns}
        pageSizeOptions={[5]}
        rowHeight={70}
        getRowId={(row) => row.id}
        rowSelection={false}
        disableColumnSorting={true}
        disableColumnFilter={true}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5, // 👈 This will force it to split 7 rows into 2 pages
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={GridStyle}
        onCellKeyDown={(params, event) => {
          const isInput =
            event.target.tagName === 'INPUT' ||
            event.target.tagName === 'TEXTAREA';
          if (isInput) {
            event.stopPropagation();
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </div>
  );
};

export default ExperienceGrid;
