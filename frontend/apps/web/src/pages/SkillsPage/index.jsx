import { useEffect, useMemo, useState } from 'react';
import DynamicForm from '../../components/DynamicForm';
import FormSection from '../../components/FormSection';
import { FormComponents } from 'shared-component-library';
import { useFormikContext, FieldArray } from 'formik';
import * as yup from 'yup';
import DataGrid from '../../components/DataGrid';
import GridStyle from '../ProjectsPage/GridStyle';
import axiosClient from '../../utils/axiosClient';

const SkillsGrid = ({ remove }) => {
  const { values, setFieldValue, handleChange } = useFormikContext();

  // 1. Map rows first so that columns useMemo has safe access to mappedRows lengths
  const mappedRows = useMemo(() => {
    return (values.skills || []).map((row, index) => ({
      ...row,
      gridRowId: `row-id-${index}`,
    }));
  }, [values.skills]);

  // 2. Build columns using the stable mappedRows layout index
  const columns = useMemo(
    () => [
      {
        field: 'skillGroupTitle',
        headerName: 'SKILL',
        width: 250,
        renderCell: (params) => {
          // Find position index directly from the mapped grid rows
          const formikIndex = mappedRows.findIndex(
            (row) => row.gridRowId === params.row.gridRowId,
          );
          if (formikIndex === -1) return null;

          return (
            <FormComponents.Input
              name={`skills.${formikIndex}.skillGroupTitle`}
              noLabel={true}
              value={values.skills[formikIndex]?.skillGroupTitle || ''}
              onChange={handleChange}
            />
          );
        },
      },
      {
        field: 'skills',
        headerName: 'SKILLS',
        flex: 1,
        renderCell: (params) => {
          const formikIndex = mappedRows.findIndex(
            (row) => row.gridRowId === params.row.gridRowId,
          );
          if (formikIndex === -1) return null;

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
              clickHandler={() => {
                const formikIndex = mappedRows.findIndex(
                  (row) => row.gridRowId === params.row.gridRowId,
                );
                if (formikIndex !== -1) {
                  remove(formikIndex);
                }
              }}
            />
          );
        },
      },
    ],
    [mappedRows, values.skills, handleChange, setFieldValue, remove],
  );

  return (
    <div>
      <DataGrid data={mappedRows} columns={columns} rowIdentifier="gridRowId" />
    </div>
  );
};

const SkillsPage = () => {
  const [userSkills, setUserSkills] = useState({ skills: [] });
  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axiosClient.get('/skills');
      const skills = response.data.data.skills;
      const transformedSkillData = Object.keys(skills).map((skill, index) => ({
        gridRowId: `row-id-${index}`,
        skillGroupTitle: skill,
        skills: skills[skill].map((skill) => ({
          label: skill,
          value: skill,
        })),
      }));
      console.log('transformedSkillData', transformedSkillData);
      setUserSkills({ skills: transformedSkillData });
    };
    fetchSkills();
  }, []);
  console.log('userSkills', userSkills);
  return (
    <DynamicForm
      initialValues={userSkills}
      validationSchema={yup.object().shape({})}
      submitHandler={async (values) => {
        // Strip out temporary layout fields on form submission
        const cleanPayload = {
          skills: values.skills.map(({ gridRowId, ...rest }) => rest),
        };
        const transformedPayload = cleanPayload.skills.reduce(
          (previousValue, currentValue, index) => {
            return {
              ...previousValue,
              [currentValue.skillGroupTitle]:
                currentValue.skills.map((skill) => skill.value) || [],
            };
          },
          {},
        );
        await axiosClient.post('/skills', { skills: transformedPayload });
      }}
    >
      <FieldArray name="skills">
        {({ remove, push }) => (
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
