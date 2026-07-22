import DynamicForm from '../../components/DynamicForm';
import FormSection from '../../components/FormSection';
import { FormComponents } from 'shared-component-library';
import { useFormikContext, FieldArray } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import GridStyle from '../ProjectsPage/GridStyle';

const skills = {
  skills: [
    {
      skillGroupTitle: 'Languages',
      skills: [
        { label: 'javascript', value: 'javascript' },
        { label: 'python', value: 'python' },
        { label: 'typescript', value: 'typescript' },
        { label: 'typescript', value: 'typescript' },
        { label: 'typescript', value: 'typescript' },
      ],
    },
    {
      skillGroupTitle: 'Databases',
      skills: [{ label: 'MongoDb', value: 'PostgreSQL' }],
    },
  ],
};

const SkillsGrid = ({ remove }) => {
  const { values, setFieldValue } = useFormikContext();

  const columns = [
    {
      field: 'skillGroupTitle',
      headerName: 'SKILL',
      width: 250,
      renderCell: (params) => {
        const formikIndex = values.skills.findIndex(
          (row) => row.skillGroupTitle === params.row.skillGroupTitle,
        );
        const currentSkillsArray = values.skills[formikIndex]?.skills || [];
        return (
          <FormComponents.Input
            name={`skills.${formikIndex}.skillGroupTitle`}
            noLabel={true}
            value={`skills.${formikIndex}.skillGroupTitle`}
          />
        );
      },
    },
    {
      field: 'skills',
      headerName: 'SKILLS',
      flex: 1,
      renderCell: (params) => {
        const formikIndex = values.skills.findIndex(
          (row) => row.skillGroupTitle === params.row.skillGroupTitle,
        );

        const currentSkillsArray = values.skills[formikIndex]?.skills || [];

        return (
          <div className="flex items-center h-full">
            <FormComponents.ChipInput
              name={`skills.${formikIndex}.skills`}
              labelRequired={false}
              value={currentSkillsArray}
              setValue={setFieldValue}
            />
          </div>
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
            clickHandler={(event) => {
              const formikIndex = values.skills.findIndex(
                (row) => row.skillGroupTitle === params.row.skillGroupTitle,
                remove,
              );
              remove(formikIndex);
            }}
          />
        );
      },
    },
  ];
  return (
    <div>
      {' '}
      <DataGrid
        rows={values.skills}
        columns={columns}
        pageSizeOptions={[5]}
        rowHeight={70}
        getRowId={(row) => row.skillGroupTitle || Date.now().toString()}
        rowSelection={false}
        disableColumnSorting={true}
        disableColumnFilter={true}
        sx={GridStyle}
       onCellKeyDown={(params, event) => {
    // 1. Check if the element currently being typed in is an input or textbox
    const isInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';

    if (isInput) {
      // 2. Stop MUI from handling arrow keys, space, enter, or navigation
      event.stopPropagation();
      
      // 3. Prevent the grid's native event wrapper from executing default cell logic
      event.defaultMuiPrevented = true;
    }
  }}
      />
    </div>
  );
};

const SkillsPage = () => {
  return (
    <DynamicForm
      initialValues={skills}
      validationSchema={yup.object().shape({})}
      submitHandler={(values) => 
    >
      <FieldArray name="skills">
        {({ insert, remove, push }) => (
          <FormSection
            title={'Skill Set'}
            push={() => {
              push({ skillGroupTitle: '', skills: [] });
            }}
            remove={remove}
            addButtonText="Add Skill"
          >
            <SkillsGrid remove={remove} />
          </FormSection>
        )}
      </FieldArray>
    </DynamicForm>
  );
};

export default SkillsPage;
